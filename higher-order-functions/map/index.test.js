import test from 'ava';
import R from 'ramda';
import map from '../../solutions/higher-order-functions/map.js';

test('map(fn, array) returns empty array when passed an empty array', t => {
  t.deepEqual(map(R.multiply(2), []), []);
});

test('map(fn, array) returns the result of applying fn to each element of array', t => {
  t.deepEqual(map(R.multiply(2), [1, 2, 3]), [2, 4, 6]);
});

test('map(fn, array) does not mutate array during operation', t => {
  const array = [1, 2, 3];
  t.deepEqual(map(R.multiply(2), array), [2, 4, 6]);
  t.deepEqual(array, [1, 2, 3]);
});

test('map(fn, array) accepts curried arguments', t => {
  t.deepEqual(map(R.multiply(2))([1, 2, 3]), [2, 4, 6]);
});
