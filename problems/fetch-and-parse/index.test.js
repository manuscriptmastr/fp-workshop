import test from 'ava';
import nock from 'nock';
import R from 'ramda';
import fetch from 'node-fetch';
import getUsers, {
  fetchUsers,
  json,
  parseUser,
  rejectIfNotOkay,
  then
} from '../../solutions/problems/fetch-and-parse.js';
// import getUsers, { fetchUsers, json, parseUser, rejectIfNotOkay, then } from './index.js';
const {
  API
} = process.env;

const EDWARD = {
  name: 'Edward Ferrars',
  id: 1,
  favoriteSubject: 'Geography'
};

const ELINOR = {
  name: 'Elinor Dashwood',
  id: 2,
  favoriteSubject: 'Weather'
};

const JOHN = {
  name: 'John Willoughby',
  id: 3,
  favoriteSubject: 'Barton Cottage'
};

const MARIANNE = {
  name: 'Marianne Dashwood',
  id: 4,
  favoriteSubject: 'Shakespeare'
};

const USERS = [EDWARD, ELINOR, JOHN, MARIANNE];

test.afterEach(nock.cleanAll);

test.serial('promise.then(rejectIfNotOkay) returns response for good statuses', async t => {
  const scope = nock(API)
    .get('/')
    .reply(200, { hello: 'world' });
  t.deepEqual(
    await fetch(API).then(rejectIfNotOkay).then(res => res.json()),
    { hello: 'world' }
  );
  scope.done();
});

test.serial('promise.then(rejectIfNotOkay) throws for bad statuses', async t => {
  const scope = nock(API)
    .get('/')
    .reply(400);
  await t.throwsAsync(
    fetch(API).then(rejectIfNotOkay).then(res => res.json()),
    { instanceOf: Error, message: 'Bad Request' }
  );
  scope.done();
});

test.serial('promise.then(json) returns JSON from a response', async t => {
  const scope = nock(API)
    .get('/')
    .reply(200, { hello: 'world' });
  t.deepEqual(
    await fetch(API).then(json),
    { hello: 'world' }
  );
  scope.done();
});

test('then(fn, result) returns result of applying fn to result.then', async t => {
  t.deepEqual(await then(R.add(2), Promise.resolve(1)), 3);
});

test('then(fn, result) does not call fn when result is a rejected Promise', async t => {
  await t.throwsAsync(
    () => then(R.add(2), Promise.reject(new Error('Yeet'))),
    { instanceOf: Error, message: 'Yeet' }
  );
});

test('then(fn, result) accepts curried arguments', async t => {
  t.deepEqual(await then(R.add(2))(Promise.resolve(1)), 3);
});

test.serial('fetchUsers() returns an array of users', async t => {
  const scope = nock(API)
    .get('/users')
    .reply(200, USERS);

  t.deepEqual(await fetchUsers(), USERS);
  scope.done();
});

test.serial('fetchUsers() throws when response is bad', async t => {
  const scope = nock(API)
    .get('/users')
    .reply(401);

  await t.throwsAsync(fetchUsers, { instanceOf: Error, message: 'Unauthorized' });
  scope.done();
});

test('parseUser(apiUser) returns a user object with only name and id', t => {
  t.deepEqual(parseUser(MARIANNE), { name: MARIANNE.name, id: MARIANNE.id });
});

test('getUsers() returns array of users with only name and id', async t => {
  const scope = nock(API)
    .get('/users')
    .reply(200, USERS);

  t.deepEqual(await getUsers(), USERS.map(({ name, id }) => ({ name, id })));
  scope.done();
});

test.serial('getUsers() throws when response is bad', async t => {
  const scope = nock(API)
    .get('/users')
    .reply(401);

  await t.throwsAsync(getUsers, { instanceOf: Error, message: 'Unauthorized' });
  scope.done();
});
