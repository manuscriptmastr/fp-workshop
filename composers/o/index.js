import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// o :: (b -> c) -> (a -> b) -> a -> c
export default o;
