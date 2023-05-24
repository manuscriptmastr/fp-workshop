import R from 'ramda';
const {
  complement,
  cond,
  both,
  evolve,
  fromPairs,
  has,
  invoker,
  is,
  isEmpty,
  map,
  pickBy,
  propSatisfies,
  T,
  toString,
  unary,
  when
} = R;

const VALUE_KEYS = [
  'value',
  'head',
  'tail'
];

const METHOD_KEYS = [
  'show',
  'map',
  'ap',
  'chain',
  'concat',
  'empty',
  'rejected',
  'reduce',
  'constructor'
];

export const clean = obj => {
  const newObj = pickBy((v, k) => !METHOD_KEYS.includes(k), obj);
  return evolve({ ...fromPairs(map(k => [k, when(is(Object), clean)], VALUE_KEYS)) }, newObj);
};

export const show = cond([
  [both(is(Object), has('show')), invoker(0, 'show')],
  [both(is(Function), propSatisfies(complement(isEmpty), 'name')), fn => `${fn.name}()`],
  [is(Function), toString],
  [T, unary(JSON.stringify)]
]);
