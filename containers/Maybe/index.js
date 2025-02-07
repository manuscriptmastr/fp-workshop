import { show } from '../../support/index.js';

// Maybe :: TypeRep Maybe
// Maybe :: {
//   value: a,
//   show: () -> String,
//   isJust: Boolean,
//   isNothing: Boolean,
//   map: (a -> b) -> Maybe b,
//   ap: Maybe (a -> b) -> Maybe b
//   chain: (a -> Maybe b) -> Maybe b
// }

// Just :: a -> Maybe a
export const Just;

// Nothing :: Maybe a
export const Nothing;
// NOTE: Nothing has no a "value" property

// Maybe.of :: a -> Maybe a
export default Maybe;
