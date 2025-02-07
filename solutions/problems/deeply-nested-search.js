import R from 'ramda';
const { compose, chain, curry, map, pipe } = R;
import Maybe, { Just, Nothing } from '../containers/Maybe.js';

export const prop = curry((key, objOrArr) =>
  objOrArr[key] === undefined
    ? Nothing
    : Just(objOrArr[key]));

export default R.curry((keys, objOrArr) => pipe(
  Maybe.of, ...map(compose(chain, prop), keys)
)(objOrArr));
