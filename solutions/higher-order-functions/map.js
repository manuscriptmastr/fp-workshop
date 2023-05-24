import R from 'ramda';

export default R.curry((fn, arr) => arr.map(fn));
