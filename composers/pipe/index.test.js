import test from 'ava';
import R from 'ramda';
import pipe, { pipeWith } from '../../solutions/composers/pipe.js';
// import pipe, { pipeWith } from './index.js';

test('pipe(fn) returns result of fn', t => {
  t.deepEqual(pipe(R.add)(1, 2), 3);
});

test('pipe(fn1, fn2) returns result of fn2 of fn1', t => {
  t.deepEqual(pipe(R.add(5), R.multiply(3))(0), 15);
});

test('pipe(...fns) accepts three or more fns', t => {
  t.deepEqual(pipe(R.add(5), R.multiply(2), R.add(2))(0), 12);
});

test('pipeWith(transform, fns) returns result of fn', t => {
  t.deepEqual(pipeWith(R.call, [R.add])(1, 2), 3);
});

test('pipeWith(transform, fns) returns result of fn2 of fn1', t => {
  t.deepEqual(pipeWith(R.call, [R.add(5), R.multiply(3)])(0), 15);
});

test('pipeWith(transform, fns) accepts three or more fns', t => {
  t.deepEqual(pipeWith(R.call, [R.add(5), R.multiply(2), R.add(2)])(0), 12);
});

test('pipeWith(transform, fns) accepts curried arguments', t => {
  t.deepEqual(pipeWith(R.call)([R.add(5), R.multiply(2), R.add(2)])(0), 12);
});
