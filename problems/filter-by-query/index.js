import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;

/*
On backend servers, it is common to filter a list of database resources based on
a query string. Writing this filtering logic by hand can become a source of tech debt
as more query params are accepted by the backend.

One way we might make matching query params to filters easier would be to simply
describe what each filter looks like (declarative!), then write a higher order function
that compares available filters to the query and only runs the filters whose key matches a query field.
For a backend request such as "GET /posts?author=463&random=BOOM":

const postFilters = {
  author: (userIdParam, post) => post.userId === userIdParam
};

const postQuery = {
  author: 463,
  random: 'BOOM'
};

We'll write the function that ties these two pieces and the list of resources all together, like so:
- filterByQuery(postFilters, postQuery, allPosts)

NOTE:
- You may not use for-loops
- You may only use curry, curryN, partial, or partialRight from Ramda
- Don't worry if you have to call Array.filter() multiple times. Loop fusion is a benefit of
  functional programming we'll get for free by focusing on declarative code.
- This is a difficult challenge. Comment out all but the first test case and write just enough
  to pass it, then continue to the next test case. Let them lead you to the solution.
*/

// filterByQuery :: {k: ((v, a) => Boolean)} -> {k: v} -> [a] -> [a]
export default filterByQuery;
