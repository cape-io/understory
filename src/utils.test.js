import { subtrahend } from './utils'

/* globals describe test expect */
describe('subtrahend', () => {
  const func1 = subtrahend(10)
  test('Subtract 1st arg from 2nd', () => {
    expect(func1(11)).toEqual(1)
    expect(func1(20)).toEqual(10)
    expect(subtrahend(10, 12)).toEqual(2)
  })
})
