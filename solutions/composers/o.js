import R from 'ramda';

export default R.curry((fn2, fn1) => value => fn2(fn1(value)));
