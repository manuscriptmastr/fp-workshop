import test from 'ava';
import R from 'ramda';
import retry from '../../solutions/higher-order-functions/retry';
// import retry from '.';

const raise = err => { throw err };

test('retry(max, fn) returns result of fn that does not throw', async t => {
  let timesCalled = 0;
  const add = R.pipe((...args) => args, R.tap(() => timesCalled++), R.apply(R.add));
  t.deepEqual(await retry(3, add)(1, 2), 3);
  t.deepEqual(timesCalled, 1);
});

test('retry(max, fn) retries fn until successful', async t => {
  let timesCalled = 0;
  const add = (a, b) => {
    timesCalled += 1;
    return timesCalled <= 1 ? raise(new Error('BOOM')) : R.add(a, b);
  };
  t.deepEqual(await retry(3, add)(1, 2), 3);
  t.deepEqual(timesCalled, 2);
});

test('retry(max, fn) throws when fn throws max + 1 times', async t => {
  let timesCalled = 0;
  const throws = R.pipe((...args) => args, R.tap(() => timesCalled++), async () => raise(new Error('BOOM')));
  await t.throwsAsync(retry(3, throws), { message: 'BOOM', instanceOf: Error });
  t.deepEqual(timesCalled, 4);
});

test('retry(max, fn) accepts curried arguments', async t => {
  t.deepEqual(await retry(3, (a, b) => a + b)(1)(2), 3);
  t.deepEqual(await retry(3)((a, b) => a + b)(1, 2), 3);
  t.deepEqual(await retry(3)((a, b) => a + b)(1)(2), 3);
});
