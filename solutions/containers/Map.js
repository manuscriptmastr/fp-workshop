import { show } from '../../support/index.js';

const Map = object => ({
  value: object,
  show: () => `Map(${Object.entries(object).map(([k, v]) => `${k}: ${show(v)}`).join(', ')})`,
  // Functor
  map: fn => Map(Object.fromEntries(Object.entries(object).map(([k, v]) => [k, fn(v)]))),
  // Semigroup
  concat: other => Map({ ...object, ...other.value }),
  // Monoid
  constructor: Map
});

// Monoid
Map.empty = () => Map({});

export default Map;
