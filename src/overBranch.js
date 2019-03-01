import {
  curry, identity,
} from 'lodash/fp'
import { getThunk } from './utils'

/**
 * Passes argument to boolCheck function. If true sends same argument to `getTrue` function.
 * @param  {Function} boolCheck Function that check if value is true.
 * @param  {Function} getTrue Get the value when true.
 * @param  {Function} getFalse Optional. Get value when false.
 * @return {any} Function that accepts a value and returns result of getTrue or getFalse.
 * @example overBranch(boolCheck, getTrue)
 */
export function overBranch(boolCheck, getTrue, getFalse = identity) {
  return x => (boolCheck(x) ? getThunk(getTrue)(x) : getThunk(getFalse)(x))
}

/**
 * Passes argument to boolCheck function. If true sends same argument to `getTrue` function.
 * @param  {Function} boolCheck Function that check if value is true.
 * @param  {Function} getValue Get the value when true.
 * @param  {Function} item The value sent to boolCheck.
 * @return {any} Result of getValue when true or the untouched item.
 * @example onTrue(_.isString, _.toUpper)('foo') // => 'FOO'
 * @example onTrue(_.isString, _.toUpper)(45) // => 45
 */
export const onTrue = curry((boolCheck, getValue, item) => (
  boolCheck(item) ? getThunk(getValue)(item) : item
))

export default overBranch
