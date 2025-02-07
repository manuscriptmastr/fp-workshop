import test from 'ava';
import R from 'ramda';
import { clean } from '../../support/index.js';
import List, { Cons, Nil } from '../../solutions/containers/List.js';
// import List, { Cons, Nil } from './index.js';

test('Nil is nothing', t => {
  t.deepEqual(clean(Nil), { isCons: false, isNil: true });
});

test('Cons(head, tail) contains passed in value', t => {
  t.deepEqual(clean(Cons(1, Nil)), { isCons: true, isNil: false, head: 1, tail: { isCons: false, isNil: true } });
});

test('Cons(head, tail) accepts curried arguments', t => {
  t.deepEqual(clean(Cons(1)(Nil)), { isCons: true, isNil: false, head: 1, tail: { isCons: false, isNil: true } });
});

test('list.map(fn) returns list with fn applied to all heads', t => {
  t.deepEqual(clean(Nil.map(R.add(2))), { isCons: false, isNil: true });
  t.deepEqual(
    clean(
      Cons(1, Nil).map(R.add(2))
    ),
    { isCons: true, isNil: false, head: 3, tail: { isCons: false, isNil: true } }
  );
  t.deepEqual(
    clean(
      Cons(1, Cons(2, Cons(3, Nil))).map(R.add(2))
    ),
    clean(
      Cons(3, Cons(4, Cons(5, Nil)))
    )
  );
});

test('list.chain(fn) returns list with fn applied to all heads and flattened', t => {
  t.deepEqual(
    clean(Nil.chain(x => Cons(x, Cons(x * 1.5, Nil)))),
    clean(Nil)
  );
  t.deepEqual(
    clean(Cons(1, Nil).chain(x => Cons(x, Cons(x * 1.5, Nil)))),
    clean(Cons(1, Cons(1.5, Nil)))
  );
  t.deepEqual(
    clean(Cons(1, Cons(2, Nil)).chain(x => Cons(x, Cons(x * 1.5, Nil)))),
    clean(Cons(1, Cons(1.5, Cons(2, Cons(3, Nil)))))
  );
});

test('List.of(value) returns Cons(value, Nil)', t => {
  t.deepEqual(clean(List.of(1)), clean(Cons(1, Nil)));
});

test('list.concat(list) returns new list from both', t => {
  t.deepEqual(
    clean(
      Nil.concat(Nil)
    ),
    clean(
      Nil
    )
  );
  t.deepEqual(
    clean(
      Cons(1, Nil).concat(Cons(2, Nil))
    ),
    clean(
      Cons(1, Cons(2, Nil))
    )
  );
  t.deepEqual(
    clean(
      Cons(1, Cons(2, Nil)).concat(Cons(3, Nil))
    ),
    clean(
      Cons(1, Cons(2, Cons(3, Nil)))
    )
  );
});

test('List.empty() returns Nil', t => {
  t.deepEqual(clean(List.empty()), clean(Nil));
});

test('list.reduce(fn)', t => {
  t.deepEqual(
    clean(
      Nil.reduce(R.add, 0)
    ),
    clean(
      0
    )
  );
  t.deepEqual(
    clean(
      Cons(1, Nil).reduce(R.add, 0)
    ),
    clean(
      1
    )
  );
  t.deepEqual(
    clean(
      Cons(1, Cons(2, Cons(3, Nil))).reduce(R.add, 0)
    ),
    clean(
      6
    )
  );
});

test('list.show() returns string representation', t => {
  t.deepEqual(Nil.show(), 'Nil');
  t.deepEqual(Cons(1, Nil).show(), 'Cons(1, Nil)');
  t.deepEqual(Cons(1, Cons(2, Nil)).show(), 'Cons(1, Cons(2, Nil))');
});
