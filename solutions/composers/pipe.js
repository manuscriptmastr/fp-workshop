import R from 'ramda';

export const pipeWith = R.curry((transform, fns) => (...args) =>
  fns.reduce(
    (val, fn, i) => i === 0 ? fn(...val) : transform(fn, val),
    args
  )
);

export default (...fns) => pipeWith(R.call, fns);

/*
BONUS:
Write a version of pipe that turns fn1(...args).then(fn2).then(fn3) into pipeP(fn1, fn2, fn3).
Hint: it uses pipeWith().
*/
