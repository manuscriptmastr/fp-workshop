import R from 'ramda';
const { curry } = R;

/*
Counting letter frequency (https://en.wikipedia.org/wiki/Letter_frequency) is a familiar
problem in coding, usually solved by converting a string to an object
(we'll call it a dictionary) where each character is set to the number of times
it appears in the string.

There are many ways to implement this. One purely functional way to do it is
to assume that a string is a Foldable (e.g. it has a .reduce() method). After all,
a container with multiple values should be iterable, therefore collapsible in some way.

Define a function that, given a single letter and a dictionary object, returns a new dictionary
accounting for the new letter. This function should work when called by any Foldable with .reduce().
*/

// Char :: String
// Dictionary :: {String: Int}
// assocDictionary :: Char -> Dictionary -> Dictionary
export default assocDictionary;
