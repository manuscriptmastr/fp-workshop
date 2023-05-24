import test from 'ava';
import R from 'ramda';
import compose from '../../solutions/composers/compose';
// import compose from '.';

test('compose(fn) returns result of fn', t => {
  t.deepEqual(compose(R.add)(1, 2), 3);
});

test('compose(fn1, fn2) returns result of fn1 of fn2', t => {
  t.deepEqual(compose(R.add(1), R.multiply(2))(0), 1);
});

test('compose(...fns) accepts three or more fns', t => {
  t.deepEqual(compose(R.add(1), R.multiply(2), R.add(2))(0), 5);
});
