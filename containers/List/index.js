import R from 'ramda';
const { curry, partialRight } = R;
import { show } from '../../support';

// List :: TypeRep List
// List :: {
//   head: List,
//   tail: List,
//   show: () -> String,
//   isCons: Boolean,
//   isNil: Boolean,
//   map: (a -> b) -> List b,
//   chain: (a -> List b) -> List b,
//   concat: List -> List,
//   reduce: ((b, a) -> b) -> b,
//   constructor: List
// }

// Nil :: List
export const Nil;
// NOTE: Nil has no head or tail property

// Head :: List
// Tail :: List
// Cons :: Head -> Tail -> List
export const Cons;

// List.of :: a -> List a
// List.empty :: () -> List
export default List;
