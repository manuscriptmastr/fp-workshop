import test from 'ava';
import { clean } from '../../support';
import Maybe, { Just, Nothing } from '../../solutions/containers/Maybe';
import path, { prop } from '../../solutions/problems/deeply-nested-search';
// import path, { prop } from '.';

test('prop(key, objOrArr) returns Just(value) when value exists', t => {
  t.deepEqual(clean(prop('x', { x: 1 })), clean(Just(1)));
  t.deepEqual(clean(prop(0, [1])), clean(Just(1)));
});

test('prop(key, objOrArr) returns Nothing when objOrArr does not have key or is undefined', t => {
  t.deepEqual(clean(prop('y', { x: 1 })), clean(Nothing));
  t.deepEqual(clean(prop('x', { x: undefined })), clean(Nothing));
  t.deepEqual(clean(prop(5, [1])), clean(Nothing));
  t.deepEqual(clean(prop(0, [undefined])), clean(Nothing));
});

test('prop(key, objOrArr) accepts curried arguments', t => {
  t.deepEqual(clean(prop('x')({ x: 1 })), clean(Just(1)));
});

test('path(keys, objOrArr) returns Just(value) when value exists', t => {
  t.deepEqual(clean(path(['x'], { x: 1 })), clean(Just(1)));
  t.deepEqual(clean(path([0], [1])), clean(Just(1)));
});

test('path(keys, objOrArr) returns Nothing when objOrArr does not have key or is undefined', t => {
  t.deepEqual(clean(path(['y'], { x: 1 })), clean(Nothing));
  t.deepEqual(clean(path(['x'], { x: undefined })), clean(Nothing));
  t.deepEqual(clean(path([5], [1])), clean(Nothing));
  t.deepEqual(clean(path([0], [undefined])), clean(Nothing));
});

test('path(keys, objOrArr) returns Just(value) when deeply nested value exists', t => {
  t.deepEqual(
    clean(path(['x', 'y'], { x: { y: 1 } })),
    clean(Just(1))
  );
  t.deepEqual(
    clean(path([0, 1], [['hello', 'world']])),
    clean(Just('world'))
  );
  t.deepEqual(
    clean(path(['x', 1, 'y'], { x: ['hello', { y: 'world' }] })),
    clean(Just('world'))
  );
});

test('path(keys, objOrArr) returns Nothing when deeply nested value does not exist or is undefined', t => {
  t.deepEqual(
    clean(path(['z', 'y'], { x: { y: 1 } })),
    clean(Nothing)
  );
  t.deepEqual(
    clean(path(['x', 'y'], { x: { y: undefined } })),
    clean(Nothing)
  );
  t.deepEqual(
    clean(path([5, 1], [['hello', 'world']])),
    clean(Nothing)
  );
  t.deepEqual(
    clean(path([0, 1], [['hello', undefined]])),
    clean(Nothing)
  );
  t.deepEqual(
    clean(path(['x', 0, 'y'], { x: ['hello', { y: 'world' }] })),
    clean(Nothing)
  );
  t.deepEqual(
    clean(path(['x', 1, 'y'], { x: ['hello', { y: undefined }] })),
    clean(Nothing)
  );
});

test('path(keys, objOrArr) accepts curried arguments', t => {
  t.deepEqual(clean(path(['x'])({ x: 1 })), clean(Just(1)));
});
