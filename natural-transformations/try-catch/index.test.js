import test from 'ava';
import R from 'ramda';
import tryCatch from '../../solutions/natural-transformations/try-catch';
// import tryCatch from '.';

test('tryCatch(fn) returns Right(value) when fn is successful', t => {
  const result = tryCatch(R.add)(1, 2);
  t.deepEqual(result.value, 3);
  t.deepEqual(result.isLeft, false);
  t.deepEqual(result.isRight, true);
});

test('tryCatch(fn) returns Left(error) when fn throws', t => {
  const result = tryCatch((a, b) => { throw new Error('BOOM') })(1, 2);
  t.true(result.value instanceof Error);
  t.deepEqual(result.value.message, 'BOOM');
  t.deepEqual(result.isLeft, true);
  t.deepEqual(result.isRight, false);
});

test('tryCatch(fn) accepts curried arguments', t => {
  const result = tryCatch((a, b) => a + b)(1)(2);
  t.deepEqual(result.value, 3);
});
