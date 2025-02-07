import { show } from '../../support/index.js';

// Fork :: a -> b -> Void
// Task :: Fork -> Task Fork
// Task :: {
//   fork: Fork,
//   show: () -> String,
//   map: (b -> c) -> Task a c,
//   ap: Task d (b -> c) -> Task d c,
//   chain: (b -> Task d c) -> Task a c
// }
// Task.of :: Task b -> Task a b
// Task.rejected :: a -> Task a b
export default Task;