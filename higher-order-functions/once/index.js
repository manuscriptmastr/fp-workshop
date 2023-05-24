import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// once :: (a... -> b) -> (a... -> b)
export default once;
