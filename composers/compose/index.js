import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// compose :: ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
export default compose;
