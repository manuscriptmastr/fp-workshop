import { show } from '../../support/index.js';

const Identity = value => ({
  value,
  show: () => `Identity(${show(value)})`,
  // Functor
  map: fn => Identity(fn(value)),
  // Apply
  ap: other => Identity(other.value(value)),
  // Monad
  chain: fn => fn(value)
});

// Applicative
Identity.of = Identity;

export default Identity;
