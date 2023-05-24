import { show } from '../../support';

// Either :: TypeRep Either
// Either :: {
//   value: a
//   show: () -> String
//   isLeft: Boolean,
//   isRight: Boolean,
//   map: (a -> b) -> Either b c,
//   ap: Either a (b -> c) -> Either a c
//   chain: (b -> Either a c) -> Either a c
// }

// Left :: a -> Either a b
export const Left;

// Right :: b -> Either a b
export const Right;

// Either.of :: b -> Either a b
export default Either;
