import {
  isEmptyArray, isEmptyString, isWorthless, rejectWorthless, subtrahend,
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
// test('oneOf', (t) => {
//   const validOptions = oneOf(['a', 'b'])
//   t.true(validOptions('a'), 'a')
//   t.true(validOptions('b'), 'b')
//   t.false(validOptions('c'), 'c')
//   t.end()
// })
