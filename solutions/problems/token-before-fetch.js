import _fetch from 'node-fetch';
import once from '../higher-order-functions/once';
const {
  API,
  USERNAME,
  PASSWORD
} = process.env;

export const getToken = () => _fetch(`${API}/token`, {
  method: 'POST',
  body: JSON.stringify({ username: USERNAME, password: PASSWORD })
})
  .then(res => res.json())
  .then(data => data.token);

const _getToken = once(getToken);

export default async (url, opts = {}) =>
  _fetch(url, {
    ...opts,
    headers: { ...opts.headers, Authorization: `Bearer ${await _getToken()}` }
  });

/*
BONUS 1:
This default export is a little complex and may introduce errors. Lift out the header merging code
into its own function and write a test for it! Perhaps something like:

headers :: (Object | (() => Promise Object)) -> ((RequestInfo, RequestInit) -> Promise Response) -> ((RequestInfo, RequestInit) -> Promise Response)
headers(headersOrFn)(fetch)(url, opts?).

BONUS 2:
once() naively assumes that a token will not expire while our script is running.
Write a higher order function that refreshes the token whenever a fetch() call returns a 401 status code.

NOTE: the default export must appear exactly the same to the consumer. Current tests should not change;
rather, we should add more test cases to account for these behaviors.
*/
