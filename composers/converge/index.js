import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

// converge :: ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
export default converge;
