import test from 'ava';
import R from 'ramda';
import { clean } from '../../support';
import Identity from '../../solutions/containers/Identity';
// import Identity from '.';

test('Identity(value) contains passed in value', t => {
  t.deepEqual(clean(Identity(1)), { value: 1 });
});

test('identity.map(fn) obeys identity law', t => {
  t.deepEqual(
    clean(
      Identity(1).map(R.identity)
    ),
    clean(
      Identity(1)
    )
  );
});

test('identity.map(fn) obeys composition law', t => {
  t.deepEqual(
    clean(
      Identity(1).map(num => R.multiply(3, R.add(2, num)))
    ),
    clean(
      Identity(1).map(R.add(2)).map(R.multiply(3))
    )
  );
});

test('identity.ap(identity) obeys composition law', t => {
  t.deepEqual(
    clean(
      Identity(1).ap(Identity(R.add(2)).ap(Identity(R.add(3)).map(f => g => x => f(g(x)))))
    ),
    clean(
      Identity(1).ap(Identity(R.add(2))).ap(Identity(R.add(3)))
    )
  );
});

test('Identity.of(value) returns Identity(value)', t => {
  t.deepEqual(
    clean(Identity.of(1)),
    clean(Identity(1))
  );
});

test('Identity.of(value) obeys identity law', t => {
  t.deepEqual(
    clean(
      Identity(1).ap(Identity.of(R.identity))
    ),
    clean(
      Identity(1)
    )
  );
});

test('Identity.of(value) obeys homomorphism law', t => {
  t.deepEqual(
    clean(
      Identity.of(1).ap(Identity.of(R.add(2)))
    ),
    clean(
      Identity.of(R.add(2)(1))
    )
  );
});

test('Identity.of(value) obeys interchange law', t => {
  t.deepEqual(
    clean(
      Identity.of(1).ap(Identity(R.add(2)))
    ),
    clean(
      Identity(R.add(2)).ap(Identity.of(fn => fn(1)))
    )
  );
});

test('identity.chain(fn) obeys associativity law', t => {
  t.deepEqual(
    clean(
      Identity(1).chain(num => (n => Identity(n + 2).chain(num => Identity(num * 2)))(num))
    ),
    clean(
      Identity(1).chain(num => Identity(num + 2)).chain(num => Identity(num * 2))
    )
  );
});

test('Identity.of(value).chain(fn) obeys left identity law', t => {
  t.deepEqual(
    clean(
      Identity.of('world').chain(R.concat('hello'))
    ),
    clean(
      R.concat('hello')('world')
    )
  );
});

test('identity.chain(of) obeys right identity law', t => {
  t.deepEqual(
    clean(
      Identity('world').chain(Identity.of)
    ),
    clean(
      Identity('world')
    )
  );
});

test('identity.show() returns string representation', t => {
  t.deepEqual(Identity(1).show(), 'Identity(1)');
  t.deepEqual(Identity(Identity(1)).show(), 'Identity(Identity(1))');
});
