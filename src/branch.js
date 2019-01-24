import { curry } from 'lodash/fp'

/**
 * Curried function form of a conditional ternary expression
 * @param {any} trueVal The value returned when true.
 * @param {any} falseVal The value returned when false.
 * @param {any} bool The value to check truthiness against.
 * @return {any} The trueVal or falseVal depending on bool.
 */
export default curry(
  (trueVal, falseVal, bool) => (bool ? trueVal : falseVal),
)
