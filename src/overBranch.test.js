import _ from 'lodash/fp'
import { onTrue, overBranch } from './overBranch'

/* globals describe test expect */
describe('overBranch', () => {
  const func1 = overBranch(_.isString, _.toUpper)
  test('When string uppercase', () => {
    expect(func1('abc')).toBe('ABC')
  })
  test('ignore number', () => {
    expect(func1(1)).toBe(1)
  })
  test('not string return NO', () => {
    const func = overBranch(_.isString, _.toUpper, _.constant('No'))
    expect(func(1)).toBe('No')
    expect(func([])).toBe('No')
    expect(func({})).toBe('No')
  })
  test('Allow non-thunk responses', () => {
    const func = overBranch(_.isNumber, 'number', 'not-number')
    expect(func('abc')).toBe('not-number')
    expect(func(1)).toBe('number')
  })
  test('Another Example', () => {
    const func = overBranch(_.isPlainObject, Array)
    expect(func({ foo: 'bar' })).toEqual([{ foo: 'bar' }])
  })
})

describe('onTrue', () => {
  const func1 = onTrue(_.isString, _.toUpper)
  test('Accept transform func', () => {
    expect(func1('abc')).toBe('ABC')
  })
  test('ignore number', () => {
    expect(func1(1)).toBe(1)
  })
  test('Allow non-thunk responses', () => {
    const func = overBranch(_.isNumber, 'number')
    expect(func('abc')).toBe('abc')
    expect(func(1)).toBe('number')
  })
})
