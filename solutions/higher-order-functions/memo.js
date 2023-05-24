import R from 'ramda';

export default fn => {
  const results = {};
  return R.curryN(fn.length, (...args) => {
    const lookupKey = JSON.stringify(args);
    if (!results.hasOwnProperty(lookupKey)) {
      results[lookupKey] = fn(...args);
    }
    return results[lookupKey];
  });
};

/*
BONUS:
Some arguments can't be stringified reliably, such as an object
where property order doesn't matter. Write a version of memo() that accepts a function argument
to turn an argument list into a unique string. Example:

memoizeWith :: (*... -> String) -> (*... -> a) -> (*... -> a)
memoizeWith((url, opts) => url, fetch)
*/
