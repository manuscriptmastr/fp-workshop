import test from 'ava';
import R from 'ramda';
import memo from '../../solutions/higher-order-functions/memo.js';
// import memo from './index.js';

test('memo(fn) returns result of fn', t => {
  const add = (a, b) => a + b;
  t.deepEqual(memo(add)(1, 2), 3);
});

test('memo(fn) returns different results when different arguments are passed', t => {
  const add = (a, b) => a + b;
  const mAdd = memo(add);
  t.deepEqual(mAdd(1, 2), 3);
  t.deepEqual(mAdd(3, 4), 7);
});

test('memo(fn) does not call fn more than once for the same list of arguments', t => {
  let timesCalled = 0;
  const add = R.pipe((...args) => args, R.tap(() => timesCalled++), R.apply(R.add));
  const mAdd = memo(add);
  t.deepEqual(mAdd(1, 2), 3);
  t.deepEqual(mAdd(3, 4), 7);
  t.deepEqual(mAdd(1, 2), 3);
  t.deepEqual(timesCalled, 2);
});

test('memo(fn) does not call fn more than once for the same list of arguments even when falsey', t => {
  let timesCalled = 0;
  const identity = R.pipe(R.tap(() => timesCalled++), R.identity);
  const mIdentity = memo(identity);
  t.deepEqual(mIdentity(undefined), undefined);
  t.deepEqual(mIdentity(true), true);
  t.deepEqual(mIdentity(undefined), undefined);
  t.deepEqual(timesCalled, 2);
});

test('memo(fn) accepts curried arguments', t => {
  t.deepEqual(memo((a, b) => a + b)(1)(2), 3);
});
