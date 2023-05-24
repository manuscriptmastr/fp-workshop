export default async fn => {
  let results = [];
  let page = 1;
  let done = false;
  while (!done) {
    let result;
    try {
      result = await fn(page);
    } catch (e) {
      result = null;
    }
    if (Array.isArray(result)) {
      results = results.concat(result);
      done = result.length === 0;
    }
    page += 1;
  }
  return results;
};

/*
BONUS 1:
Assume that fn() returns a payload of { data: [], total: number }.
Write a version of depaginate() that only waits on the first result,
then concurrently calls the remaining pages.

BONUS 2:
Write a version of depaginate() that can switch between strategies based on
the presence or absence of a total.
*/
