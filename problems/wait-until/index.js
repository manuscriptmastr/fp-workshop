import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;
import o from '../../composers/o';

/*
Waiting a specified amount of time is quite simple with setTimeout() and async/await.
But what about waiting until a timestamp, rather than for a time duration? This use case comes up
when scheduling notifications or cron jobs.

It may be tempting to write an entirely different function to capture this behavior,
but the only difference between wait(ms) and waitUntil(timestamp) is how the time to wait is calculated.

Write two separate functions, then use o() to construct into waitUntil(timestamp).
Let the test cases guide you to the solution.
*/

// Milliseconds = Number
// UnixTimestamp = Number

// wait :: Milliseconds -> Promise Void
export const wait;

// untilTime :: UnixTimestamp -> Milliseconds
export const untilTime;

// waitUntil :: UnixTimestamp -> Promise Void
export const waitUntil;
