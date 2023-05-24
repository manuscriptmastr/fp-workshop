import test from 'ava';
import R from 'ramda';
import o from '../../solutions/composers/o';
// import o from '.';

test('o(fn2, fn1) applies the result of fn1 to fn2 when provided a value', t => {
  t.deepEqual(o(R.add(2), R.multiply(2))(3), 8);
});

test('o(fn2, fn1) can only be passed one value', t => {
  t.deepEqual(o(R.add(2), R.multiply(2))(3, null), 8);
});

test('o(fn2, fn1) accepts curried arguments', t => {
  t.deepEqual(o(R.add(2))(R.multiply(2))(3), 8);
});
