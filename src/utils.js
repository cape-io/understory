import {
  compact, concat, cond, constant, divide, eq, flow, gt, has,
  identity, includes, isArray, isEmpty, isFunction,
  isNull, isString, isPlainObject,
  lt, map, omitBy, overEvery, overSome, negate,
  pickBy, reject, stubTrue, subtract, trim,
} from 'lodash/fp'

/**
 * [callWith description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
export const callWith = (...args) => func => func(...args)

export const getCheck = x => (isFunction(x) ? x : eq(x))
export const getThunk = x => (isFunction(x) ? x : constant(x))
export const getThunks = map(x => [getCheck(x[0]), getThunk(x[1])])

/**
 * Accepts many [boolCheck, onTrue] arguments. See _.cond() for more info.
 *   The function or exact match to check item against.
 *   If onTrue is a function it is sent the the value like _.cond()
 *   If onTrue is not a function the value of onTrue is returned.
 * @see onTrue if you have one condition.
 * @param  {array} conditions one or more condition arrays [boolCheck, thenFunc]
 * @return {any}            Result of found thenFunc or if no conditions found return original.
 */
export const condId = (...conditions) => cond(concat(
  getThunks(conditions),
  [[stubTrue, identity]],
))

/**
 * Returns true if sent a value that is exactly `false`.
 * @param {any} value Send it anything
 * @return {bool} Tells you if it is exactly false.
 * @example isFalse(1) // => false
 * @example isFalse(false) // => true
 */
export const isFalse = eq(false)

/**
 * Returns true if sent a value that is exactly 0.
 * @param {any} value Send it anything
 * @return {bool} Tells you if it is exactly zero.
 * @example isZero(0.1) // => false
 * @example isZero(0) // => true
 */
export const isZero = eq(0)

/**
 * Returns true if sent a value that is exactly `false`.
 * @param {any} value Send it anything
 * @return {bool} Tells you if it is exactly false.
 * @example isTrue(1) // => false
 * @example isTrue(true) // => true
 */
export const isTrue = eq(true)

export const isEmptyString = overEvery([isString, flow(trim, isEmpty)])
export const isEmptyObject = overEvery([isPlainObject, flow(pickBy(identity), isEmpty)])
export const isEmptyArr = overEvery([isArray, flow(compact, isEmpty)])
export const rejectEmpty = reject(overSome([isEmptyString, isEmptyObject, isEmptyArr]))
// Only does one level of recursion. :-(
export const isEmptyArray = overEvery([
  isArray, flow(compact, rejectEmpty, isEmpty),
])

/**
 * [isWorthless description]
 * @param {any} value
 * @return {bool} Tells you if value is empty.
 * @example isWorthless({}) // => true
 * @example isWorthless([' ', null]) // => true
 * @example isWorthless(' ') // => true
 * @example isWorthless({ foo: null, bar: 0 }) // => true
 */
export const isWorthless = overSome([
  isNull, isFalse, isZero, isEmptyString, isEmptyArray, isEmptyObject,
])
export const rejectWorthless = reject(isWorthless)

export const cleanObject = omitBy(isWorthless)

export const clean = condId(
  [isArray, flow(compact, map(clean))], // eslint-disable-line no-use-before-define
  [isPlainObject, cleanObject],
  [isString, trim],
)

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
 * @type {Function}
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
export const subtrahend = subtract.convert({ rearg: true })

export const stubNull = () => null

// export const methodArgs = _.invokeArgs
// export const titleize = flow(lowerCase, startCase)
