import test from 'ava';
import filterByQuery from '../../solutions/problems/filter-by-query';
// import filterByQuery from '.';

const JANUARY_1_1811 = -5017593600;
const JANUARY_5_1811 = -5017248000;
const JANUARY_8_1811 = -5016988800;
const MARCH_1_1811 = -5012496000;

const LETTER_1 = {
  from: 'Marianne Dashwood',
  to: 'John Willoughby',
  content: "How surprised you will be, Willoughby, on receiving this...",
  timestamp: JANUARY_1_1811
};

const LETTER_2 = {
  from: 'Marianne Dashwood',
  to: 'John Willoughby',
  content: 'John, this is Marianne...',
  timestamp: JANUARY_8_1811
};

const LETTER_3 = {
  from: 'Lucy Steele',
  to: 'Elinor Dashwood',
  content: "I hope my dear Miss Dashwood will excuse the liberty I take of writing to her...",
  timestamp: MARCH_1_1811
};

const LETTERS = [LETTER_1, LETTER_2, LETTER_3];

const FILTERS = {
  from: (name, letter) => letter.from === name,
  to: (name, letter) => letter.name === name,
  before: (timestamp, letter) => letter.timestamp < timestamp,
  after: (timestamp, letter) => letter.timestamp > timestamp
};

test('filterByQuery(filters, query, entries) returns entries as is if query is empty', t => {
  t.deepEqual(filterByQuery(FILTERS, {}, LETTERS), LETTERS);
});

test('filterByQuery(filters, query, entries) ignores query params for which no filter exists', t => {
  t.deepEqual(filterByQuery(FILTERS, { random: false }, LETTERS), LETTERS);
});

test('filterByQuery(filters, query, entries) filters on query param that matches a filter', t => {
  t.deepEqual(filterByQuery(FILTERS, { from: 'Marianne Dashwood' }, LETTERS), [LETTER_1, LETTER_2]);
});

test('filterByQuery(filters, query, entries) filters on multiple query params that match a filter', t => {
  t.deepEqual(filterByQuery(FILTERS, { from: 'Marianne Dashwood', after: JANUARY_5_1811 }, LETTERS), [LETTER_2]);
});

test('filterByQuery(filters, query, entries) accepts curried arguments', t => {
  t.deepEqual(filterByQuery(FILTERS)({})(LETTERS), LETTERS);
});
