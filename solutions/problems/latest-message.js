import R from 'ramda';
const { chain, curry, curryN, pipe } = R;
import Maybe, { Just, Nothing } from '../containers/Maybe';

export const find = curryN(2, pipe(
  (pred, arr) => arr.find(pred),
  candidate => candidate === undefined ? Nothing : Just(candidate)
));

export const propEq = curry((key, value, obj) => obj[key] === value);

export default curry((name, messages) => pipe(
  Maybe.of,
  chain(find(propEq('name', name)))
)(messages));
