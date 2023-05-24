import test from 'ava';
import R from 'ramda';
import { Cons, Nil } from '../../solutions/containers/List';
import assocDictionary from '../../solutions/problems/letter-frequency';
// import assocDictionary from '.';

String.prototype.reduce = R.curry(function(fn, acc) {
  const _reduce = (fn, acc, str) =>
    str.length === 0
      ? acc
      : _reduce(fn, fn(acc, str.slice(0, 1)), str.slice(1));
  return _reduce(fn, acc, this.valueOf());
});

test('array.reduce(assocDictionary) reduces array to a letter frequency dictionary', t => {
  t.deepEqual(
    ['h', 'e', 'l', 'l', 'o'].reduce(R.flip(assocDictionary), {}),
    { h: 1, e: 1, l: 2, o: 1 }
  );
});

test('string.reduce(assocDictionary) reduces string to a letter frequency dictionary', t => {
  t.deepEqual(
    'hello'.reduce(R.flip(assocDictionary), {}),
    { h: 1, e: 1, l: 2, o: 1 }
  );
});

test('list.reduce(assocDictionary) reduces linked list to a letter frequency dictionary', t => {
  t.deepEqual(
    Cons('h', Cons('e', Cons('l', Cons('l', Cons('o', Nil))))).reduce(R.flip(assocDictionary), {}),
    { h: 1, e: 1, l: 2, o: 1 }
  );
});
