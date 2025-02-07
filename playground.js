import { deepStrictEqual as eq, fail } from 'assert';
import { clean, show } from './support/index.js';
import R from 'ramda';
const { compose, curry, curryN, partial, partialRight, pipe } = R;

// Use this file to follow along the examples or jot down experiments.
// You can run this file with "npm run playground".

const multiply = curry((a, b) => a * b);
const repeat = curry((size, item) => Array(size).fill(item));
const lte = curry((a, b) => a - b);

const map = curry((fn, arr) => arr.map(fn));
const of = curry((constructor, arg) => constructor.of(arg));
const flatMap = curry((fn, arr) => arr.flatMap(fn));
const concat = curry((a, b) => a.concat(b));
const reduce = curry((fn, accumulator, arr) => arr.reduce(fn, accumulator));
const constructor = container => container.constructor;
const empty = constructor => constructor.empty();
Array.empty = () => [];

[1, 2, 3].map(multiply(2)); // [2, 4, 6]
map(multiply, [1, 2, 3]); // [2, 4, 6]

Array.of(1); // [1]
of(Array, 1); // [1]

[1, 2, 3].constructor; // Array
constructor([1, 2, 3]); // Array

'hello'.constructor; // String
constructor('hello'); // String

[1, 2, 3].flatMap(repeat(2)); // [1, 1, 2, 2, 3, 3]
flatMap(repeat(2), [1, 2, 3]); // [1, 1, 2, 2, 3, 3]

[1, 2, 3].concat([4, 5, 6]); // [1, 2, 3, 4, 5, 6]
concat([1, 2, 3], [4, 5, 6]); // [1, 2, 3, 4, 5, 6]

'hel'.concat('lo'); // 'hello'
concat('hel', 'lo'); // 'hello'

[1, 2, 3].reduce(multiply, 1); // 6
reduce(multiply, 1, [1, 2, 3]); // 6
