import test from 'ava';
import R from 'ramda';
import { clean } from '../../support/index.js';
import List, { Cons, Nil } from '../../solutions/containers/List.js';
import reverse, { of, concat, empty, reduce } from '../../solutions/problems/reverse.js';
// import reverse, { of, concat, empty, reduce } from './index.js';

Array.empty = () => [];

String.of = char => char.toString();
String.empty = () => '';
String.prototype.reduce = R.curry(function(fn, acc) {
  const _reduce = (fn, acc, str) =>
    str.length === 0
      ? acc
      : _reduce(fn, fn(acc, str.slice(0, 1)), str.slice(1));
  return _reduce(fn, acc, this.valueOf());
});

test('of(Container, value) returns Container with value', t => {
  t.deepEqual(of(Array, 1), [1]);
  t.deepEqual(of(String, 1), '1');
  t.deepEqual(clean(of(List, 1)), clean(Cons(1, Nil)));
});

test('concat(listLike, listLike) returns new listLike', t => {
  t.deepEqual(concat([1, 2], [3]), [1, 2, 3]);
  t.deepEqual(concat('hel', 'lo'), 'hello');
});

test('empty(Container) returns empty Container', t => {
  t.deepEqual(empty(Array), []);
  t.deepEqual(empty(String), '');
  t.deepEqual(clean(empty(List)), clean(Nil));
});

test('reduce(fn, accumulator, listLike) reduces listLike to type of accumulator', t => {
  t.deepEqual(reduce(R.add, 0, [1, 2, 3]), 6);
  t.deepEqual(
    reduce((acc, x) => R.add(acc, x.charCodeAt(0)), 0, 'hello'),
    532
  );
  t.deepEqual(
    reduce(R.add, 0, Cons(1, Cons(2, Cons(3, Nil)))),
    6
  );
});

test('reverse(listLike) returns reversed array when given array', t => {
  t.deepEqual(reverse([1, 2, 3]), [3, 2, 1]);
});

test('reverse(listLike) returns reversed string when given string', t => {
  t.deepEqual(reverse('Hello'), 'olleH');
});

test('reverse(listLike) returns reversed linked list when given linked list', t => {
  t.deepEqual(
    clean(
      reverse(Cons(1, Cons(2, Cons(3, Nil))))
    ),
    clean(
      Cons(3, Cons(2, Cons(1, Nil)))
    )
  );
});
