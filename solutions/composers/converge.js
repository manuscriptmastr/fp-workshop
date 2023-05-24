import R from 'ramda';

export default R.curry((fn, fns) => {
  const length = fns.reduce((prevLength, currFn) =>
    currFn.length > prevLength
      ? currFn.length
      : prevLength,
    0
  );

  return R.curryN(length, (...args) => fn(...fns.map(fn => fn(...args))));
});
