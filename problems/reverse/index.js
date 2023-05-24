import R from 'ramda';
const { curry } = R;

/*
Any container that holds multiple "things" and must be in order has the same
mathematical properties.

Write one function that reverses:
- an Array, e.g. [1, 2, 3] => [3, 2, 1]
- a String
- a Linked List, e.g. Cons(1, Cons(2, Cons(3, Nil))) => Cons(3, Cons(2, Cons(1, Nil)))
without:
- Calling .reverse()
- For-loops
- Switch-cases
- Changing behavior based on type

Array already implements of(), concat(), and reduce().
String already implements concat().
Polyfills are supplied in the test suite.
*/

// of :: F -> a -> f a
export const of;

// concat :: f a -> f a -> f a
export const concat;

// empty :: F -> f
export const empty;

// constructor :: f -> F
export const constructor = container => container.constructor;

// reduce :: ((b, a) -> b) -> f b -> a -> b
export const reduce;

// reverse :: a -> a
export default reverse;
