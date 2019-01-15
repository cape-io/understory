import {
  cond, identity, stubTrue,
} from 'lodash/fp'

/**
 * Passes argument to boolCheck function. If true sends same argument to `getTrue` function.
 * @param  {Function} boolCheck Function that check if value is true.
 * @param  {Function} getTrue Get the value when true.
 * @param  {Function} getTrue Optional. Get value when false.
 * @return {any} Result of getTrue or getFalse.
 * @example overBranch(boolCheck, getTrue)
 */
export default function overBranch(boolCheck, getTrue, getFalse = identity) {
  return cond([[boolCheck, getTrue], [stubTrue, getFalse]])
}
