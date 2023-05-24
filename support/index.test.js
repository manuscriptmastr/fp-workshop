import test from 'ava';
import { clean, show } from '.';

test('clean(object) removes methods from object', t => {
  t.deepEqual(
    clean({
      value: 1,
      show: () => 'hello',
      isLeft: false,
      isRight: true,
      map: 'hello',
      ap: 'there',
      chain: 'world',
      concat: 'again'
    }),
    { value: 1, isLeft: false, isRight: true }
  );
});

test('clean(object) removes methods from object.value', t => {
  t.deepEqual(
    clean({
      value: {
        value: 1,
        isLeft: false,
        isRight: true,
        map: 'yo'
      },
      isLeft: false,
      isRight: true,
      map: 'yeet'
    }),
    { value: { value: 1, isLeft: false, isRight: true }, isLeft: false, isRight: true }
  )
})

test('show(value) uses JSON.stringify() for primitives', t => {
  t.deepEqual(show(1), '1');
  t.deepEqual(show(true), 'true');
  t.deepEqual(show('hello'), '"hello"');
});

test('show(value) uses value.toString() for functions', t => {
  t.deepEqual(show(() => 'hello'), `() => 'hello'`);
});

test('show(value) uses value.name for functions with truthy names', t => {
  const sayHello = () => 'hello';
  t.deepEqual(show(sayHello), 'sayHello()');
  function yolo () { return 'yolo' };
  t.deepEqual(show(yolo), 'yolo()');
});

test('show(value) uses JSON.stringify() for objects', t => {
  t.deepEqual(show({ x: 1, y: 2 }), '{"x":1,"y":2}');
});

test('show(value) uses JSON.stringify() for arrays', t => {
  t.deepEqual(show([1, 2, 'hello']), '[1,2,"hello"]');
});

test('show(value) uses value.show() for object with show method', t => {
  t.deepEqual(show({ show: () => 'hello world'}), 'hello world');
});
