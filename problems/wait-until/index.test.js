import test from 'ava';
import { wait, waitUntil, untilTime } from '../../solutions/problems/wait-until.js';
// import { wait, waitUntil, untilTime } from './index.js';

test('wait(ms) waits specified ms', async t => {
  t.timeout(500);
  await wait(400);
  t.pass();
});

test('untilTime(unixTimestamp) returns the difference in milliseconds between now and unix timestamp', t => {
  t.deepEqual(untilTime(Date.now() / 1000 + 1), 1000);
});

test('waitUntil(unixTimestamp) waits until timestamp', async t => {
  t.timeout(500);
  await waitUntil((Date.now() + 400) / 1000);
  t.pass();
})
