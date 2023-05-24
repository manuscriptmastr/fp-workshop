import test from 'ava';
import R from 'ramda';
import { clean } from '../../support';
import Maybe, { Just, Nothing } from '../../solutions/containers/Maybe';
// import Maybe, { Just, Nothing } from '.';

test('Just(value) contains passed in value', t => {
  t.deepEqual(clean(Just(1)), { isJust: true, isNothing: false, value: 1 });
  // Don't pass null or undefined to Just() in real life
  t.deepEqual(clean(Just(null)), { isJust: true, isNothing: false, value: null });
  t.deepEqual(clean(Just(undefined)), { isJust: true, isNothing: false, value: undefined });
});

test('Nothing contains no value', t => {
  t.deepEqual(clean(Nothing), { isJust: false, isNothing: true });
});

test('maybe.map(fn) obeys identity law', t => {
  t.deepEqual(
    clean(
      Just(1).map(R.identity)
    ),
    clean(
      Just(1)
    )
  );
  t.deepEqual(
    clean(
      Nothing.map(R.identity)
    ),
    clean(
      Nothing
    )
  );
});

test('maybe.map(fn) obeys composition law', t => {
  t.deepEqual(
    clean(
      Just(1).map(num => R.multiply(3, R.add(2, num)))
    ),
    clean(
      Just(1).map(R.add(2)).map(R.multiply(3))
    )
  );
  t.deepEqual(
    clean(
      Nothing.map(num => R.multiply(3, R.add(2, num)))
    ),
    clean(
      Nothing.map(R.add(2)).map(R.multiply(3))
    )
  );
});

test('maybe.ap(maybe) obeys composition law', t => {
  t.deepEqual(
    clean(
      Just(1).ap(Just(R.add(2)).ap(Just(R.add(3)).map(f => g => x => f(g(x)))))
    ),
    clean(
      Just(1).ap(Just(R.add(2))).ap(Just(R.add(3)))
    )
  );
  t.deepEqual(
    clean(
      Nothing.ap(Just(R.add(2)).ap(Just(R.add(3)).map(f => g => x => f(g(x)))))
    ),
    clean(
      Nothing.ap(Just(R.add(2))).ap(Just(R.add(3)))
    )
  );
});

test('Maybe.of(value) returns Just(value)', t => {
  t.deepEqual(
    clean(Maybe.of(1)),
    clean(Just(1))
  );
  // Don't pass null or undefined to Maybe.of() in real life
  t.deepEqual(
    clean(Maybe.of(null)),
    clean(Just(null))
  );
  t.deepEqual(
    clean(Maybe.of(undefined)),
    clean(Just(undefined))
  );
});

test('Maybe.of(value) obeys identity law', t => {
  t.deepEqual(
    clean(
      Just(1).ap(Maybe.of(R.identity))
    ),
    clean(
      Just(1)
    )
  );
  t.deepEqual(
    clean(
      Nothing.ap(Maybe.of(R.identity))
    ),
    clean(
      Nothing
    )
  );
});

test('Maybe.of(value) obeys homomorphism law', t => {
  t.deepEqual(
    clean(
      Maybe.of(1).ap(Maybe.of(R.add(2)))
    ),
    clean(
      Maybe.of(R.add(2)(1))
    )
  );
});

test('Maybe.of(value) obeys interchange law', t => {
  t.deepEqual(
    clean(
      Maybe.of(1).ap(Just(R.add(2)))
    ),
    clean(
      Just(R.add(2)).ap(Maybe.of(fn => fn(1)))
    )
  );
  t.deepEqual(
    clean(
      Maybe.of(1).ap(Nothing)
    ),
    clean(
      Nothing.ap(Maybe.of(fn => fn(1)))
    )
  );
});

test('maybe.chain(fn) obeys associativity law', t => {
  t.deepEqual(
    clean(
      Just(1).chain(num => (n => Just(n + 2).chain(num => Just(num * 2)))(num))
    ),
    clean(
      Just(1).chain(num => Just(num + 2)).chain(num => Just(num * 2))
    )
  );
  t.deepEqual(
    clean(
      Nothing.chain(num => (n => Nothing.chain(num => Nothing))(num))
    ),
    clean(
      Nothing.chain(num => Nothing).chain(num => Nothing)
    )
  );
  t.deepEqual(
    clean(
      Just(1).chain(num => (n => Nothing.chain(num => Just(num * 2)))(num))
    ),
    clean(
      Just(1).chain(num => Nothing).chain(num => Just(num * 2))
    )
  );
});

test('Maybe.of(value).chain(fn) obeys left identity law', t => {
  t.deepEqual(
    clean(
      Maybe.of('world').chain(R.concat('hello'))
    ),
    clean(
      R.concat('hello')('world')
    )
  );
});

test('maybe.chain(of) obeys right identity law', t => {
  t.deepEqual(
    clean(
      Just('world').chain(Maybe.of)
    ),
    clean(
      Just('world')
    )
  );
  t.deepEqual(
    clean(
      Nothing.chain(Maybe.of)
    ),
    clean(
      Nothing
    )
  );
});

test('maybe.show() returns string representation', t => {
  t.deepEqual(Maybe.of(1).show(), 'Just(1)');
  t.deepEqual(Just(1).show(), 'Just(1)');
  t.deepEqual(Nothing.show(), 'Nothing');
  t.deepEqual(Just(Just(1)).show(), 'Just(Just(1))');
  t.deepEqual(Just(Nothing).show(), 'Just(Nothing)');
});
