import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// depaginate :: (Number -> [a]) -> [a]
export default depaginate;
