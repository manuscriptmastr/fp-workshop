import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// pipeWith :: ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
export const pipeWith;

// pipe :: (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
export default pipe;
