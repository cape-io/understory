import { curry } from 'lodash/fp'

/**
 * Like _.forEach but can handle a promise generator as the iteratee.
 * Iterates over elements of collection and invokes iteratee for each element.
 * The iteratee is invoked with one argument: (value).
 * Iteratee functions may NOT exit iteration early.
 * @param {Function} iteratee The function that should process each item.
 * @param {Array} collection The iterable. Each val send to func after previous resolves.
 * @return {Promise} The value return value of the last promise.
 */
export const forEachP = curry((iteratee, collection) => collection.reduce(
  (chain, arg) => chain.then(() => iteratee(arg)),
  Promise.resolve(),
))

/**
 * map for Promises. Invokes iteratee in serial sequence instead of all at once.
 * @param {Function} iteratee The function that should process each item.
 * @param {Array} collection The iterable. Each val send to func after previous resolves.
 * @return {Promise} The value return value of the last promise.
 */
export const mapP = curry((iteratee, collection) => collection.reduce(
  (chain, arg) => chain.then(vals => Promise.all([...vals, iteratee(arg)])),
  Promise.resolve([]),
))
const reducer = (state, func) => state.then(newState => func(newState))
export const chainP = (...fns) => fns.reduce(
  reducer,
  Promise.resolve(),
)
export const flowP = (...fns) => start => fns.reduce(
  reducer,
  Promise.resolve(start),
)

export const wait = ms => new Promise(r => setTimeout(r, ms))
export const waitFor = ms => () => wait(ms)
