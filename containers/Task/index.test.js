import test from 'ava';
import R from 'ramda';
import Task from '../../solutions/containers/Task.js';
// import Task from './index.js';

const reject = value => (rej, res) => rej(value);
const resolve = value => (rej, res) => res(value);

test.cb('Task(fork).fork(reject, resolve) calls first argument when rejected', t => {
  Task(reject('Rejected')).fork(
    R.pipe(msg => t.deepEqual(msg, 'Rejected'), t.end),
    t.fail
  );
});

test.cb('Task(fork).fork(reject, resolve) calls second argument when resolved', t => {
  Task(resolve(1)).fork(
    t.fail,
    R.pipe(val => t.deepEqual(val, 1), t.end)
  );
});

test.cb('task.map(fn) obeys identity law', t => {
      Task(resolve(1))
        .map(R.identity)
        .fork(t.fail, first =>
          Task(resolve(1))
            .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
        );
});

test.cb('task.map(fn) obeys composition law', t => {
  Task(resolve(1))
    .map(num => R.multiply(3, R.add(2, num)))
    .fork(t.fail, first =>
      Task(resolve(1))
        .map(R.add(2))
        .map(R.multiply(3))
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test.cb('task.ap(task) obeys composition law', t => {
  Task(resolve(1))
    .ap(Task(resolve(R.add(2)))
      .ap(Task(resolve(R.add(3)))
        .map(f => g => x => f(g(x)))
      )
    )
    .fork(t.fail, first =>
      Task(resolve(1))
        .ap(Task(resolve(R.add(2))))
        .ap(Task(resolve(R.add(3))))
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test.cb('Task.rejected(value) returns Task that rejects with value', t => {
  Task.rejected('Rejected')
    .fork(R.pipe(msg => t.deepEqual(msg, 'Rejected'), t.end), t.fail);
});

test.cb('Task.of(value) returns Task that resolves with value', t => {
  Task.of(1)
    .fork(t.fail, R.pipe(num => t.deepEqual(num, 1), t.end));
});

test.cb('Task.of(value) obeys identity law', t => {
  Task(resolve(1))
    .ap(Task.of(R.identity))
    .fork(t.fail, first =>
      Task(resolve(1))
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test.cb('Task.of(value) obeys homomorphism law', t => {
  Task.of(1)
    .ap(Task.of(R.add(2)))
    .fork(t.fail, first =>
      Task.of(R.add(2)(1))
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test.cb('Task.of(value) obeys interchange law', t => {
  Task.of(1)
    .ap(Task(resolve(R.add(2))))
    .fork(t.fail, first =>
      Task(resolve(R.add(2)))
        .ap(Task.of(fn => fn(1)))
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test.cb('task.chain(fn) obeys associativity law', t => {
  Task(resolve(1))
    .chain(num => (n => Task(resolve(n + 2))
      .chain(num => Task(resolve(num * 2)))
      )(num)
    ).fork(t.fail, first =>
      Task(resolve(1))
        .chain(num => Task(resolve(num + 2)))
        .chain(num => Task(resolve(num * 2)))
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test.cb('Task.of(value).chain(fn) obeys left identity law', t => {
  Task.of(1)
    .chain(num => Task(resolve(R.identity(num))))
    .fork(t.fail, first =>
      Task.of(1)
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test.cb('task.chain(of) obeys right identity law', t => {
  Task(resolve(1))
    .chain(Task.of)
    .fork(t.fail, first =>
      Task(resolve(1))
        .fork(t.fail, R.pipe(second => t.deepEqual(first, second), t.end))
    );
});

test('task.show() returns string representation', t => {
  const resolveOne = (rej, res) => res(1);
  t.deepEqual(Task((rej, res) => res(1)).show(), 'Task((rej, res) => res(1))');
  t.deepEqual(Task(resolveOne).show(), 'Task(resolveOne())');
});
