import test from 'ava';
import R from 'ramda';
import { clean, show } from '../../support';
import Either, { Left, Right } from '../../solutions/containers/Either';
// import Either from '.';

test('Left(value) contains passed in value', t => {
  t.deepEqual(clean(Left(1)), { isLeft: true, isRight: false, value: 1 });
});

test('Right(value) contains passed in value', t => {
  t.deepEqual(clean(Right(1)), { isLeft: false, isRight: true, value: 1 });
});

test('either.map(fn) obeys identity law', t => {
  t.deepEqual(
    clean(
      Right(1).map(R.identity)
    ),
    clean(
      Right(1)
    )
  );
  t.deepEqual(
    clean(
      Left(1).map(R.identity)
    ),
    clean(
      Left(1)
    )
  );
});

test('either.map(fn) obeys composition law', t => {
  t.deepEqual(
    clean(
      Right(1).map(num => R.multiply(3, R.add(2, num)))
    ),
    clean(
      Right(1).map(R.add(2)).map(R.multiply(3))
    )
  );
  t.deepEqual(
    clean(
      Left(1).map(num => R.multiply(3, R.add(2, num)))
    ),
    clean(
      Left(1).map(R.add(2)).map(R.multiply(3))
    )
  );
});

test('either.ap(either) obeys composition law', t => {
  t.deepEqual(
    clean(
      Right(1).ap(Right(R.add(2)).ap(Right(R.add(3)).map(f => g => x => f(g(x)))))
    ),
    clean(
      Right(1).ap(Right(R.add(2))).ap(Right(R.add(3)))
    )
  );
  t.deepEqual(
    clean(
      Left(1).ap(Right(R.add(2)).ap(Right(R.add(3)).map(f => g => x => f(g(x)))))
    ),
    clean(
      Left(1).ap(Right(R.add(2))).ap(Right(R.add(3)))
    )
  );
});

test('Either.of(value) returns Right(value)', t => {
  t.deepEqual(
    clean(Either.of(1)),
    clean(Right(1))
  );
});

test('Either.of(value) obeys identity law', t => {
  t.deepEqual(
    clean(
      Left(1).ap(Either.of(R.identity))
    ),
    clean(
      Left(1)
    )
  );
  t.deepEqual(
    clean(
      Right(1).ap(Either.of(R.identity))
    ),
    clean(
      Right(1)
    )
  );
});

test('Either.of(value) obeys homomorphism law', t => {
  t.deepEqual(
    clean(
      Either.of(1).ap(Either.of(R.add(2)))
    ),
    clean(
      Either.of(R.add(2)(1))
    )
  );
});

test('Either.of(value) obeys interchange law', t => {
  t.deepEqual(
    show(
      Either.of(1).ap(Left(R.add(2)))
    ),
    show(
      Left(R.add(2)).ap(Either.of(fn => fn(1)))
    )
  );
  t.deepEqual(
    clean(
      Either.of(1).ap(Right(R.add(2)))
    ),
    clean(
      Right(R.add(2)).ap(Either.of(fn => fn(1)))
    )
  );
});

test('either.chain(fn) obeys associativity law', t => {
  t.deepEqual(
    clean(
      Right(1).chain(num => (n => Right(n + 2).chain(num => Right(num * 2)))(num))
    ),
    clean(
      Right(1).chain(num => Right(num + 2)).chain(num => Right(num * 2))
    )
  );
  t.deepEqual(
    clean(
      Left(1).chain(num => (n => Left(n + 2).chain(num => Left(num * 2)))(num))
    ),
    clean(
      Left(1).chain(num => Left(num + 2)).chain(num => Left(num * 2))
    )
  );
  t.deepEqual(
    clean(
      Right(1).chain(num => (n => Left(n + 2).chain(num => Right(num * 2)))(num))
    ),
    clean(
      Right(1).chain(num => Left(num + 2)).chain(num => Right(num * 2))
    )
  );
});

test('Either.of(value).chain(fn) obeys left identity law', t => {
  t.deepEqual(
    clean(
      Either.of('world').chain(R.concat('hello'))
    ),
    clean(
      R.concat('hello')('world')
    )
  );
});

test('either.chain(of) obeys right identity law', t => {
  t.deepEqual(
    clean(
      Right('world').chain(Either.of)
    ),
    clean(
      Right('world')
    )
  );
  t.deepEqual(
    clean(
      Left('world').chain(Either.of)
    ),
    clean(
      Left('world')
    )
  );
});

test('either.show() returns string representation', t => {
  t.deepEqual(Left(1).show(), 'Left(1)');
  t.deepEqual(Right(1).show(), 'Right(1)');
  t.deepEqual(Right(Left(1)).show(), `Right(Left(1))`);
  t.deepEqual(Left(Right(1)).show(), `Left(Right(1))`);
});
