import {
  at, curry, defaultTo, divide, eq, fill, find, flow, gt, has,
  identity, includes, isFunction, isPlainObject, lt, nthArg, spread, zipObject,
} from 'lodash/fp'
// import { concat, cond, curry, identity, stubTrue } from 'lodash/fp'

/**
 * Curried function form of a conditional ternary expression
 * @param {any} trueVal The value return when true.
 * @param {any} falseVal The value returned when false.
 * @param {any} bool The value to check truthiness against.
 * @return {any} The trueVal or falseVal depending on bool.
 */
export const branch = curry((trueVal, falseVal, bool) => (bool ? trueVal : falseVal))

/**
 * Passes argument to boolCheck function. If true sends same argument to `getTrue` function.
 * @param  {Function} boolCheck Function that check if value is true.
 * @param  {Function} getTrue Get the value when true.
 * @param  {Function} getTrue Optional. Get value when false.
 * @return {any} Result of getTrue or getFalse.
 */
export function overBranch(boolCheck, getTrue, getFalse = identity) {
  return cond([[boolCheck, getTrue], [stubTrue, getFalse]])
}

/**
 * Accepts many [ifFunc, thenFunc] arguments. See _.cond() for more info.
 * @param  {array} conditions one or more condition arrays [ifFunc, thenFunc]
 * @return {any}            Result of found thenFunc or if no conditions found return original.
 */
export const condId = (...conditions) => cond(concat(conditions, [[stubTrue, identity]]))

/**
 * Returns true if sent a value that is exactly false.
 * @param {any} value Send it anything
 * @return {bool} Tells you if it is exactly false.
 */
export const isFalse = eq(false)
export const isTrue = eq(true)
export const isEmptyString = overEvery([isString, trim, isEmpty])
export const isEmptyArray = overEvery([isArray, flow(compact, isEmpty)])
export const isEmptyObject = overEvery([isObject, flow(pickBy(identity), isEmpty)])
export const isGlib = overSome([
  isNull, isEmptyString, isEmptyArray, isEmptyObject,
])
export const hasSize = negate(isEmpty)

export const oneOf = includes.convert({ rearg: false })
export const isGt = lt
export const isLt = gt
export const hasOf = has.convert({ rearg: false })
export const divideBy = divide.convert({ rearg: true })
