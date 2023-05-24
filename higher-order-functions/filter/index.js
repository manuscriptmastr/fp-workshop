import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// filter :: (a -> Boolean) -> [a] -> [a]
export default filter;
