import { show } from '../../support';

export const Just = value => ({
  value,
  show: () => `Just(${show(value)})`,
  isJust: true,
  isNothing: false,
  // Functor
  map: fn => Just(fn(value)),
  // Applicative
  ap: other => other.isJust ? Just(other.value(value)) : other,
  // Monad
  chain: fn => fn(value)
});

export const Nothing = {
  show: () => 'Nothing',
  isJust: false,
  isNothing: true,
  // Functor
  map: () => Nothing,
  // Apply
  ap: () => Nothing,
  // Monad
  chain: () => Nothing
};

const Maybe = {
  // Applicative
  of: Just
};

export default Maybe;
