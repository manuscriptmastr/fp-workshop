import { show } from '../../support';

const Task = fork => ({
  fork,
  show: () => `Task(${show(fork)})`,
  // Functor
  map: fn => Task((rej, res) => fork(rej, x => res(fn(x)))),
  // Apply
  ap: other => Task((rej, res) => other.fork(rej, fn => fork(rej, x => res(fn(x))))),
  // Chain
  chain: fn => Task((rej, res) => fork(rej, x => fn(x).fork(rej, res)))
});

// Applicative
Task.of = value => Task((rej, res) => res(value));
Task.rejected = value => Task((rej, res) => rej(value));

export default Task;
