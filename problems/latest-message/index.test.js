import test from 'ava';
import { clean } from '../../support';
import Maybe, { Just, Nothing } from '../../solutions/containers/Maybe';
import getLatestMessage, { find, propEq } from '../../solutions/problems/latest-message';
// import getLatestMessage, { chain, find, propEq } from '.';

const LETTER_1 = {
  name: 'Marianne Dashwood',
  content: "How surprised you will be, Willoughby, on receiving this..."
};

const LETTER_2 = {
  name: 'Marianne Dashwood',
  content: 'John, this is Marianne...'
};

const LETTER_3 = {
  name: 'Lucy Steele',
  content: "I hope my dear Miss Dashwood will excuse the liberty I take of writing to her..."
};

const LETTERS = [LETTER_1, LETTER_2, LETTER_3];

test('find(pred, arr) returns Just(value) when array element fulfills predicate', t => {
  t.deepEqual(
    clean(find(x => x % 2 === 1, [1, 2, 3])),
    clean(Just(1))
  );
});

test('find(pred, arr) returns Nothing when no array element fulfills predicate', t => {
  t.deepEqual(
    clean(find(x => x % 2 === 1, [2, 4, 6])),
    clean(Nothing)
  );
});

test('propEq(key, value, obj) returns true when obj[key] equals value', t => {
  t.deepEqual(propEq('x', 1, { x: 1 }), true);
});

test('propEq(key, value, obj) returns false when obj[key] does not exist or equal value', t => {
  t.deepEqual(propEq('x', 1, { y: 1 }), false);
  t.deepEqual(propEq('x', 1, { x: 2 }), false);
});

test('getLatestMessage(name, messages) returns Just(message) when user and messages exist', t => {
  t.deepEqual(
    clean(getLatestMessage('Marianne Dashwood', LETTERS)),
    clean(Just(LETTER_1))
  );
});

test('getLatestMessage(name, messages) returns Nothing when user or messages do not exist', t => {
  t.deepEqual(
    clean(getLatestMessage('John Willoughby', LETTERS)),
    clean(Nothing)
  );
});

test('getLatestMessage(name, messages) accepts curried arguments', t => {
  t.deepEqual(
    clean(getLatestMessage('Marianne Dashwood')(LETTERS)),
    clean(Just(LETTER_1))
  );
});
