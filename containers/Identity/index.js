import { show } from '../../support';

// Identity :: a -> Identity a
// Identity :: {
//   value: a,
//   show: () -> String,
//   map: (a -> b) -> Identity b,
//   ap: Identity (a -> b) -> Identity b,
//   chain: (a -> Identity b) -> Identity b
// }
// Identity.of :: a -> Identity a
export default Identity;
