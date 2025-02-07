import { show } from '../../support/index.js';

// Map :: {k: v} -> Map {k: v}
// Map :: {
//   value: {k: v},
//   show: () -> String,
//   map: (a -> b) -> Map b,
//   concat: Map -> Map,
//   constructor: Map
// }
// Map.empty :: () -> Map
export default Map;
