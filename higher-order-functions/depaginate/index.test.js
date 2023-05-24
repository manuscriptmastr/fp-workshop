import test from 'ava';
import R from 'ramda';
import depaginate from '../../solutions/higher-order-functions/depaginate';
// import depaginate from '.';

test('depaginate(fn) returns empty array when first fn(page) returns empty array', async t => {
  let timesCalled = 0;
  const paginatedFn = R.pipe(
    // Collect arguments
    (...args) => args,
    // Increment timesCalled every time paginatedFn() is called
    R.tap(() => timesCalled++),
    // Fake an API response
    R.apply(R.cond([
      // paginatedFn(1) returns []
      [R.equals(1), R.always([])]
    ]))
  );
  t.deepEqual(await depaginate(paginatedFn), []);
  t.deepEqual(timesCalled, 1);
});

test('depaginate(fn) concatenates and returns the result of fn(page) on all pages', async t => {
  let timesCalled = 0;
  const paginatedFn = R.pipe(
    (...args) => args,
    R.tap(() => timesCalled++),
    R.apply(R.cond([
      // paginatedFn(1) returns [1]
      [R.equals(1), R.always([1])],
      // paginatedFn(2) returns [2]
      [R.equals(2), R.always([2])],
      // ...
      [R.equals(3), R.always([3])],
      [R.equals(4), R.always([])]
    ]))
  );
  t.deepEqual(await depaginate(paginatedFn), [1, 2, 3]);
  t.deepEqual(timesCalled, 4);
});

test('depaginate(fn) ignores the result of fn(page) when it does not return an array', async t => {
  let timesCalled = 0;
  const paginatedFn = R.pipe(
    (...args) => args,
    R.tap(() => timesCalled++),
    R.apply(R.cond([
      [R.equals(1), R.always([1])],
      [R.equals(2), R.always([2])],
      [R.equals(3), R.always(new Error('BOOM'))],
      [R.equals(4), R.always([])]
    ]))
  );
  t.deepEqual(await depaginate(paginatedFn), [1, 2]);
  t.deepEqual(timesCalled, 4);
});
