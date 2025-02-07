import R from 'ramda';
import map from '../../solutions/higher-order-functions/map.js';
import { pipeWith } from '../../solutions/composers/pipe.js';
import fetch from 'node-fetch';
const {
  API
} = process.env;

const raise = err => { throw err };

export const rejectIfNotOkay = res => res.ok ? res : raise(new Error(res.statusText));

export const json = response => response.json();

export const then = R.curry((fn, res) => res.then(fn));

export const fetchUsers = pipeWith(then, [() => fetch(`${API}/users`), rejectIfNotOkay, json]);

export const parseUser = ({ name, id }) => ({ name, id });

export default pipeWith(then, [fetchUsers, map(parseUser)]);
