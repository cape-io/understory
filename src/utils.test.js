import _ from 'lodash/fp'
import {
  condId, isEmptyArray, isEmptyString, isWorthless,
  oneOf, rejectWorthless, subtrahend,
} from '.'

/* globals describe test expect */

describe('subtrahend', () => {
  const func1 = subtrahend(10)
  test('Subtract 1st arg from 2nd', () => {
    expect(func1(11)).toEqual(1)
    expect(func1(20)).toEqual(10)
    expect(subtrahend(10, 12)).toEqual(2)
  })
})

describe('rejectWorthless', () => {
  test('remove junk from array', () => {
    expect(rejectWorthless([])).toEqual([])
    expect(rejectWorthless(['', null])).toEqual([])
    expect(rejectWorthless([false, true, {}, [null]])).toEqual([true])
  })
})
describe('isEmptyString', () => {
  test('empty string after trim true', () => {
    expect(isEmptyString('')).toBe(true)
    expect(isEmptyString(' ')).toBe(true)
  })
})
describe('isEmptyArray', () => {
  test('empty strings, null, bools', () => {
    expect(isEmptyArray([])).toBe(true)
    expect(isEmptyArray([' ', null, false, ''])).toBe(true)
    expect(isEmptyArray([false, 0, null, ' '])).toBe(true)
    expect(isEmptyArray([true])).toBe(false)
  })
})
describe('isWorthless', () => {
  test('bools', () => {
    expect(isWorthless(false)).toBe(true)
    expect(isWorthless(true)).toBe(false)
  })
  test('numbers have value', () => {
    expect(isWorthless(0)).toBe(true)
    expect(isWorthless(0.1)).toBe(false)
  })
  test('objs', () => {
    expect(isWorthless({})).toBe(true)
    expect(isWorthless({ foo: null, bar: 0 })).toBe(true)
  })
  test('arrays', () => {
    expect(isWorthless([{}, null, []])).toBe(true)
    expect(isWorthless([{ foo: null, bar: 0 }])).toBe(true)
  })
})

describe('oneOf', () => {
  const validOptions = oneOf(['a', 'b'])
  test('checks to see if item is in an array', () => {
    expect(validOptions('a')).toBe(true)
    expect(validOptions('b')).toBe(true)
    expect(validOptions('c')).toBe(false)
  })
})
describe('condId', () => {
  const obj = { foo: 'bar' }
  const func = condId(
    [2, _.multiply(2)],
    [3, _.multiply(3)],
    [_.eq(4), 'yum!'],
    [oneOf(['foo', 'bar']), obj],
  )
  test('onTrue result of transformer', () => {
    expect(func(2)).toBe(4)
    expect(func(3)).toBe(9)
  })
  test('no match return unchanged', () => {
    expect(func(1)).toBe(1)
  })
  test('allow non function option', () => {
    expect(func(4)).toBe('yum!')
    expect(func('foo')).toBe(obj)
    expect(func('bar')).toBe(obj)
  })
})
