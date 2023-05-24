import { show } from '../../support';

export const Left = value => ({
  value,
  show: () => `Left(${show(value)})`,
  isLeft: true,
  isRight: false,
  // Functor
  map: () => Left(value),
  // Applicative
  ap: other => other.isLeft ? other : Left(value),
  // Monad
  chain: () => Left(value)
});

export const Right = value => ({
  value,
  show: () => `Right(${show(value)})`,
  isLeft: false,
  isRight: true,
  // Functor
  map: fn => Right(fn(value)),
  // Apply
  ap: other => other.isRight ? Right(other.value(value)) : other,
  // Monad
  chain: fn => fn(value)
});

const Either = {
  // Applicative
  of: Right
};

export default Either;
