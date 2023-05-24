import R from 'ramda';
const { curry, curryN, partialRight, pipe } = R;
import { show } from '../../support';

const _Nil = {
  show: () => `Nil`,
  isCons: false,
  isNil: true,
  // Functor
  map: () => Nil,
  // Chain
  chain: () => Nil,
  // Semigroup
  concat: other => other,
  // Foldable
  reduce: curry((fn, acc) => acc),
};

const _Cons = curry((head, tail) => {
  const map = curry((fn, { head, tail }) => Cons(fn(head), tail.isNil ? Nil : map(fn, tail)));
  const concat = curry(({ head, tail, isNil }, other) => isNil ? other : Cons(head, concat(tail, other)));
  const reduce = curry((fn, acc, { head, tail }) => tail.isNil ? fn(acc, head) : reduce(fn, fn(acc, head), tail));
  return {
    show: () => `Cons(${show(head)}, ${show(tail)})`,
    isCons: true,
    isNil: false,
    head,
    tail,
    // Functor
    map: partialRight(map, [{ head, tail }]),
    // Chain
    chain: fn => reduce(concat, Nil, map(fn, { head, tail })),
    // Semigroup
    concat: concat({ head, tail }),
    // Foldable
    reduce: partialRight(reduce, [{ head, tail }]),
  };
});

const List = {
  // Applicative
  of: value => ({ ..._Cons(value, { ..._Nil, constructor: List }), constructor: List }),
  // Monoid
  empty: () => ({ ..._Nil, constructor: List })
};

export const Nil = { ..._Nil, constructor: List };
export const Cons = curryN(_Cons.length, pipe(_Cons, cons => ({ ...cons, constructor: List, tail: { ...cons.tail, constructor: List } })));

export default List;
