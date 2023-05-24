import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// memo :: (a... -> b) -> (a... -> b)
export default memo;
