import R from 'ramda';
const { curry } = R;

export const of = curry((constructor, arg) => constructor.of(arg));

export const concat = curry((a, b) => a.concat(b));

export const empty = constructor => constructor.empty();

export const reduce = curry((fn, accumulator, foldable) => foldable.reduce(fn, accumulator));

export const constructor = container => container.constructor;

export default list => reduce(
  (acc, x) => concat(of(constructor(list), x), acc),
  empty(constructor(list)),
  list
);
