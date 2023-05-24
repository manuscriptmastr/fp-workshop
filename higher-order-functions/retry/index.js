import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// retry :: Number -> (a... -> b) -> (a... -> b)
export default retry;
