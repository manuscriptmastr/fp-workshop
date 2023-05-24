import R from 'ramda';

export default R.curry((pred, arr) => arr.filter(pred));
