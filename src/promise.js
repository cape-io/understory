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
export const chainP = fns => fns.reduce(
  (promiseChain, func) => promiseChain.then(func),
  Promise.resolve(),
)

export const flowP = (...fns) => start => fns.reduce(
  (state, func) => state.then(newState => func(newState)),
  Promise.resolve(start),
)
export const wait = ms => new Promise(r => setTimeout(r, ms))
export const waitFor = ms => () => wait(ms)
