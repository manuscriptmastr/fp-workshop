import test from 'ava';
import R from 'ramda';
import filter from '../../solutions/higher-order-functions/filter';

test('filter(predicate, array) returns empty array when passed empty array', t => {
  t.deepEqual(filter(R.is(Number), []), []);
});

test('filter(predicate, array) returns the result of applying predicate to each element of array', t => {
  t.deepEqual(filter(R.is(Number), [1, '2', 3]), [1, 3]);
});

test('filter(predicate, array) does not mutate array during operation', t => {
  const array = [1, '2', 3];
  t.deepEqual(filter(R.is(Number), array), [1, 3]);
  t.deepEqual(array, [1, '2', 3]);
});

test('filter(predicate, array) accepts curried arguments', t => {
  t.deepEqual(filter(R.is(Number))([1, '2', 3]), [1, 3]);
});
