import R from 'ramda';

export default R.curry((max, fn) => R.curryN(fn.length, async (...args) => {
  let tries = max + 1;
  while (tries > 0) {
    try {
      return await fn(...args);
    } catch (e) {
      tries--;
      if (tries === 0) {
        throw e;
      }
    }
  }
}));

/*
BONUS 1:
Write a version of retry() that calls a fn returning a Response.
Only if the fn
  1) throws an "AbortError" or "FetchError" or
  2) returns a 429 "Too Many Requests" status code
should retry() reattempt the fn.

BONUS 2:
Sometimes APIs return a Retry-After header (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After).
Add waiting behavior if this header is present. (You may find yourself using wait() and/or untilTime())
*/
