import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;
import Either, { Left, Right } from '../../solutions/containers/Either';

// tryCatch :: (a... -> b) -> (a... -> Either Error b)
export default tryCatch;
