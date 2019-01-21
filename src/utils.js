import {
  compact, concat, cond, curry, curryN, divide, eq, flow, gt, has,
  identity, includes, isArray, isEmpty, isString, isPlainObject,
  lt, map, omitBy, overEvery, overSome, negate, pickBy, rearg, stubTrue, subtract, trim,
} from 'lodash/fp'
// import { concat, cond, curry, identity,  } from 'lodash/fp'

/**
 * Curried function form of a conditional ternary expression
 * @param {any} trueVal The value return when true.
 * @param {any} falseVal The value returned when false.
 * @param {any} bool The value to check truthiness against.
 * @return {any} The trueVal or falseVal depending on bool.
 */
export const branch = curry((trueVal, falseVal, bool) => (bool ? trueVal : falseVal))

/**
 * Accepts many [ifFunc, thenFunc] arguments. See _.cond() for more info.
 * @param  {array} conditions one or more condition arrays [ifFunc, thenFunc]
 * @return {any}            Result of found thenFunc or if no conditions found return original.
 */
export const condId = (...conditions) => cond(concat(conditions, [[stubTrue, identity]]))

/**
 * Returns true if sent a value that is exactly `false`.
 * @param {any} value Send it anything
 * @return {bool} Tells you if it is exactly false.
 * @example isFalse(1) // => false
 * @example isFalse(false) // => true
 */
export const isFalse = eq(false)

/**
 * Returns true if sent a value that is exactly `false`.
 * @param {any} value Send it anything
 * @return {bool} Tells you if it is exactly false.
 * @example isTrue(1) // => false
 * @example isTrue(true) // => true
 */
export const isTrue = eq(true)
export const isEmptyString = overEvery([isString, flow(trim, isEmpty)])
export const isEmptyArray = overEvery([isArray, flow(compact, isEmpty)])
export const isEmptyObject = overEvery([isPlainObject, flow(pickBy(identity), isEmpty)])
export const isWorthless = overSome([
  isEmpty, isEmptyString, isEmptyArray, isEmptyObject,
])

export const cleanObject = omitBy(isWorthless)

/**
 * Opposite of `_.isEmpty`.
 * @type {Function}
 */
export const hasSize = negate(isEmpty)

export const oneOf = includes.convert({ rearg: false })

/**
 * Checks to see if second arg is greater than first. See _.lt
 * @type {Function}
 * @example isGt(1)(2) // => true
 */
export const isGt = lt

/**
 * Checks to see if second arg is less than first. See _.gt
 * @type {Boolean}
 * @example isLt(2)(1) // => true
 */
export const isLt = gt

export const hasOf = has.convert({ rearg: false })
export const divideBy = divide.convert({ rearg: true })

/**
 * Subtract two numbers.
 *
 * @category Math
 * @param {number} subtrahend A quantity/number to be subtracted from another.
 * @param {number} minuend A quantity/number from which another is to be subtracted.
 * @returns {number} Returns the difference.
 * @example
 *
 * _.subtrahend(6)(8);
 * // => 2
 * _.subtrahend(6, 8);
 * // => 2
 */
export const subtrahend = curryN(2, rearg([1, 0], subtract))

export const clean = condId(
  [isArray, flow(compact, map(clean))], // eslint-disable-line no-use-before-define
  [isPlainObject, cleanObject],
  [isString, trim],
)
