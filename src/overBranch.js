import _ from 'lodash/fp.js'
import { getCheck, getThunk } from './utils.js'

const {
  curry, identity,
} = _

/**
 * Passes argument to boolCheck function. If true sends same argument to `getTrue` function.
 * @param  {Function|any} boolCheck Function that check if value is true.
 * @param  {Function|any} getTrue Get the value when true.
 * @param  {Function|any} getFalse Optional. Get value when false.
 * @return {any} Function that accepts a value and returns result of getTrue or getFalse.
 * @example overBranch(boolCheck, getTrue)
 */
export function overBranch(boolCheck, getTrue, getFalse = identity) {
  return (x) => (getCheck(boolCheck)(x) ? getThunk(getTrue)(x) : getThunk(getFalse)(x))
}

/**
 * Passes argument to boolCheck function. If true sends same argument to `getTrue` function.
 * Similar to overBranch but no getFalse option.
 * @param  {Function|any} boolCheck Function that check if value is true.
 * @param  {Function|any} getValue Get the value when true.
 * @param  {Function|any} item The value sent to boolCheck.
 * @return {any} Result of getValue when true or the untouched item.
 * @example onTrue(_.isString, _.toUpper)('foo') // => 'FOO'
 * @example onTrue(_.isString, _.toUpper)(45) // => 45
 */
export const onTrue = curry((boolCheck, getValue, item) => (
  getCheck(boolCheck)(item) ? getThunk(getValue)(item) : item
))

export default overBranch
