export default (...fns) => (...args) =>
  fns.reduceRight(
    (val, fn, i, arr) => i === arr.length - 1 ? fn(...val) : fn(val),
    args
  );
