import R from 'ramda';

export default R.curry((filters, query, entries) => {
  const filterEntries = Object.entries(filters);
  const filtersByQuery = filterEntries
    .filter(([k, _]) => query.hasOwnProperty(k))
    .map(([k, v]) => R.partial(v, [query[k]]));

  const cumulativeFilter = entry => filtersByQuery.every(f => f(entry));
  return entries.filter(cumulativeFilter);
});
