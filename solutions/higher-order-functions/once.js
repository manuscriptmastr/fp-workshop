import R from 'ramda';

export default fn => {
  let called = false;
  let result;
  return R.curryN(fn.length, (...args) => {
     result = called ? result : fn(...args);
     called = true;
     return result;
  });
};
