import R from 'ramda';
const { curry } = R;

export default curry((key, obj) => ({
  ...obj,
  [key]: obj.hasOwnProperty(key) ? obj[key] + 1 : 1
}));
