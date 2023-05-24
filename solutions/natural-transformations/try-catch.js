import R from 'ramda';
import { Left, Right } from '../../solutions/containers/Either';

export default fn => R.curryN(fn.length, (...args) => {
  try {
    return Right(fn(...args));
  } catch (e) {
    return Left(e);
  }
});
