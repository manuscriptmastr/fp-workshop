import test from 'ava';
import nock from 'nock';
import FetchClient from '.';
// import fetch, { getToken } from '.';
const {
  API,
  USERNAME,
  PASSWORD
} = process.env;

const TOKEN = 'eyJ123.thejaneaustentokenofapproval.Sf1_adc';
const LETTER = {
  from: "John Willoughby",
  to: "Marianne Dashwoood",
  text: "MY DEAR MADAM, I have just had the honour of receiving your letter, for which I beg to return my sincere acknowledgments."
};
const COTTAGE = {
  location: "Devonshire",
  name: "Barton Cottage",
  description: "With dark narrow stairs and a kitchen that smokes."
};

// Before:
test.serial('FetchClient.getToken() fetches token', async t => {
  const scope = nock(API)
    .post('/token', { username: USERNAME, password: PASSWORD })
    .reply(201, { token: TOKEN });

  const client = new FetchClient(USERNAME, PASSWORD);
  await client.getToken();
  t.deepEqual(client._token, TOKEN);
  scope.done();
});

test.serial('FetchClient.fetch(path, opts) gets token and fetches', async t => {
  const tokenScope = nock(API)
    .post('/token', { username: USERNAME, password: PASSWORD })
    .reply(201, { token: TOKEN });
  const resourceScope = nock(API)
    .matchHeader('Authorization', `Bearer ${TOKEN}`)
    .get('/letters')
    .reply(200, [LETTER]);

  const client = new FetchClient(USERNAME, PASSWORD);
  t.deepEqual(await client.fetch(`${API}/letters`).then(res => res.json()), [LETTER]);
  tokenScope.done();
  resourceScope.done();
});

test.serial('FetchClient.fetch(path, opts) gets token only once and fetches', async t => {
  const tokenScope = nock(API)
    .post('/token', { username: USERNAME, password: PASSWORD })
    .reply(201, { token: TOKEN });
  const lettersScope = nock(API)
    .matchHeader('Authorization', `Bearer ${TOKEN}`)
    .get('/letters')
    .reply(200, [LETTER]);
  const rentalsScope = nock(API)
    .matchHeader('Authorization', `Bearer ${TOKEN}`)
    .get('/rentals')
    .reply(200, [COTTAGE]);

  const client = new FetchClient(USERNAME, PASSWORD);
  t.deepEqual(await client.fetch(`${API}/letters`).then(res => res.json()), [LETTER]);
  t.deepEqual(await client.fetch(`${API}/rentals`).then(res => res.json()), [COTTAGE]);
  tokenScope.done();
  lettersScope.done();
  rentalsScope.done();
});

// // After:
// test.serial('getToken() fetches token', async t => {
//   const scope = nock(API)
//     .post('/token', { username: USERNAME, password: PASSWORD })
//     .reply(201, { token: TOKEN });

//   t.deepEqual(await getToken(), TOKEN);
//   scope.done();
// });

// test.serial('fetch(url, opts?) fetches', async t => {
//   const tokenScope = nock(API)
//     .post('/token', { username: USERNAME, password: PASSWORD })
//     .reply(201, { token: TOKEN });
//   const resourceScope = nock(API)
//     .matchHeader('Authorization', `Bearer ${TOKEN}`)
//     .get('/letters')
//     .reply(200, [LETTER]);

//   t.deepEqual(await fetch(`${API}/letters`).then(res => res.json()), [LETTER]);
//   tokenScope.done();
//   resourceScope.done();
// });
