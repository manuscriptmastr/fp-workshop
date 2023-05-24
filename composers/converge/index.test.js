import test from 'ava';
import R from 'ramda';
import converge from '../../solutions/composers/converge';
// import converge from '.';

test('converge(fn, fns) returns result of fn without arguments', t => {
  t.deepEqual(converge(R.always(3), [])(), 3);
});

test('converge(fn, fns) accepts array of one fn', t => {
  t.deepEqual(converge(R.add(3), [R.multiply(2)])(1), 5);
});

test('converge(fn, fns) accepts array of two fns', t => {
  t.deepEqual(converge(R.divide, [R.sum, R.length])([1, 2, 3]), 2);
});

test('converge(fn, fns) accepts array of three or more fns', t => {
  t.deepEqual(converge(R.unapply(R.sum), [R.sum, R.length, R.reduce(R.multiply, 1)])([1, 2, 3]), 15);
});

test('converge(fn, fns) accepts curried arguments (part 1)', t => {
  t.deepEqual(converge(R.divide)([R.sum, R.length])([1, 2, 3]), 2);
});

test('converge(fn, fns) accepts curried arguments (part 2)', t => {
  t.deepEqual(converge(R.divide)([R.curryN(3, R.unapply(R.sum)), (one, two) => one + two])(1, 2, 3), 2);
});
