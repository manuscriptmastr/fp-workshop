import R from 'ramda';
const { curry, curryN, partial, partialRight } = R;
import map from '../../solutions/higher-order-functions/map';
import { pipeWith } from '../../solutions/composers/pipe';
import fetch from 'node-fetch';
const {
  API
} = process.env;

/*
There are many ways to fail in a complex pipeline, such as fetching users from
an API, throwing if the response is bad (!response.ok), and parsing a successful
users response.

Because of this, it is common to break down these behaviors into unit-tested functions,
then compose them to create new functions. (This example may seem like overkill, but realize that
rejectIfNotOkay(), json(), and then() would likely be kept in a separate folder or library
because they are extremely reusable behaviors.

NOTES:
- No for-loops
- Use pipeWith(transform, fns) for fetchUsers() and getUsers()
- You may not define any other functions or module-level variables.
  For instance, instead of defining the plural form of parseUser(),
  use the map() recipe to make parseUser() work on an array of users.
- Let the test cases lead you through the order. Smaller functions are defined before they are used
  by larger functions
*/

// APIUser = { name: String, id: Number, favoriteSubject: String }
// User = { name: String, id: Number }

// raise :: Error -> Never
const raise = err => { throw err };

// rejectIfNotOkay :: Response -> Response
export const rejectIfNotOkay;

// json :: Response -> Promise JSON
export const json;

// then :: (a -> b) -> Promise a -> Promise b
export const then;

// fetchUsers :: () -> Promise [APIUser]
export const fetchUsers;

// parseUser :: APIUser -> User
export const parseUser;

// getUsers :: () -> Promise [User]
export default getUsers;
