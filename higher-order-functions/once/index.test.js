import test from 'ava';
import R from 'ramda';
import once from '../../solutions/higher-order-functions/once.js';
// import once from './index.js';

test('once(fn) returns result of fn', t => {
  const identity = val => val;
  t.deepEqual(once(identity)(1), 1);
});

test('once(fn) always returns first result of fn', t => {
  let timesCalled = 0;
  const identity = val => R.tap(() => timesCalled++, val);
  const identityOnce = once(identity);
  t.deepEqual(identityOnce(1), 1);
  t.deepEqual(identityOnce(9), 1);
  t.deepEqual(timesCalled, 1);
});

test('once(fn) always returns first result of fn even when falsey', t => {
  let timesCalled = 0;
  const nothing = () => R.tap(() => timesCalled++, undefined);
  const nothingOnce = once(nothing);
  t.deepEqual(nothingOnce(1), undefined);
  t.deepEqual(nothingOnce(9), undefined);
  t.deepEqual(timesCalled, 1);
});

test('once(fn) accepts curried arguments', t => {
  t.deepEqual(once((a, b) => a + b)(1)(2), 3);
});
