import test from 'ava';
import R from 'ramda';
import { clean } from '../../support';
import Map from '../../solutions/containers/Map';
// import Map from '.';

test('Map(object) contains passed in value', t => {
  t.deepEqual(Map({ a: 1, b: 2, c: 3 }).value, { a: 1, b: 2, c: 3 });
});

test('map.map(fn) obeys identity law', t => {
  t.deepEqual(
    clean(
      Map({ a: 1, b: 2 }).map(R.identity)
    ),
    clean(
      Map({ a: 1, b: 2 })
    )
  );
});

test('map.map(fn) obeys composition law', t => {
  t.deepEqual(
    clean(
      Map({ a: 1, b: 2 }).map(num => R.multiply(3, R.add(2, num)))
    ),
    clean(
      Map({ a: 1, b: 2 }).map(R.add(2)).map(R.multiply(3))
    )
  );
});

test('map.concat(map) returns Map containing the key value pairs of both', t => {
  t.deepEqual(
    clean(
      Map({ a: 1 }).concat(Map({ b: 2 }))
    ),
    clean(
      Map({ a: 1, b: 2 })
    )
  );
});

test('map.concat(map) obeys associativity law', t => {
  t.deepEqual(
    clean(
      Map({ a: 1 }).concat(Map({ b: 2 })).concat(Map({ c: 3 }))
    ),
    clean(
      Map({ a: 1 }).concat(Map({ b: 2 }).concat(Map({ c: 3 })))
    )
  );
});

test('Map.empty() returns Map containing empty object', t => {
  t.deepEqual(
    clean(Map.empty()),
    clean(Map({}))
  );
});

test('Map.empty() obeys right identity law', t => {
  t.deepEqual(
    clean(
      Map({ a: 1 }).concat(Map.empty())
    ),
    clean(
      Map({ a: 1 })
    )
  );
});

test('Map.empty() obeys left identity law', t => {
  t.deepEqual(
    clean(
      Map.empty().concat(Map({ a : 1 }))
    ),
    clean(
      Map({ a: 1 })
    )
  );
});

test('map.show() returns string representation', t => {
  t.deepEqual(Map({ a: 1 }).show(), 'Map(a: 1)');
  t.deepEqual(Map({ a: 1, b: 2 }).show(), 'Map(a: 1, b: 2)');
  t.deepEqual(Map({ a: Map({ b: 2 }) }).show(), 'Map(a: Map(b: 2))');
});
