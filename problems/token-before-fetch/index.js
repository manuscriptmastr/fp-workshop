import _fetch from 'node-fetch';
const {
  API,
  USERNAME,
  PASSWORD
} = process.env;

/*
FetchClient decorates fetch(url, opts?) with the ability to fetch and persist an access token
which is used on all successive fetch calls.

Persistance is a stateful behavior that adds complexity to test cases
and makes sense as a separate unit for testability and code reuse.

Also, the fetch API is so ubiquitious that it feels clumsy to force callers to call FetchClient.fetch()
to derive its benefits. We would rather persistence to be added under the hood. This "wrist slap"
will drastically reduce our git diffs even as we add advanced behaviors like default headers, retry, and semaphore.

Refactor this class into a collection of functions:
- getToken(), which returns a token.
- once(fn), which calls getToken() once and persists the result on subsequent calls.
  Solve this function (higher-order-functions/once/index.js) and then import it here.
- fetch(url, opts?), which will be the default export.
*/

export default class FetchClient {
  _token;
  _username;
  _password;

  constructor(username, password) {
    this._username = username;
    this._password = password;
  }

  fetch = (url, opts = {}) => this._token
    ? this._fetchWithToken(url, opts)
    : this.getToken().then(() => this._fetchWithToken(url, opts));

  getToken = () =>
    _fetch(`${API}/token`, {
      method: 'POST',
      body: JSON.stringify({ username: this._username, password: this._password })
    })
      .then(res => res.json())
      .then(data => this._token = data.token);
  
  _fetchWithToken = (url, opts = {}) =>
    _fetch(url, { ...opts, headers: { ...opts.headers, Authorization: `Bearer ${this._token}` } });
}

export const defaultClient = () => new FetchClient(USERNAME, PASSWORD);

// getToken :: () -> Promise String
// export const getToken;

// fetch :: (RequestInfo, RequestInit) -> Promise Response
// export default fetch;
