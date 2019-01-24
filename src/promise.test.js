import _ from 'lodash/fp'
import { forEachP, wait } from './promise'

/* globals describe jest test expect */

describe('forEachP', () => {
  const items = ['a', 'b', 'c']
  test('Return 1st arg when true', () => {
    const callback = jest.fn()
    const asyncFunc = val => wait(10).then(() => callback(val, _.now()))
    expect.assertions(6)
    return forEachP(asyncFunc, items).then(() => {
      const { calls } = callback.mock
      expect(calls.length).toBe(3)
      expect(calls[0][0]).toBe('a')
      expect(calls[1][0]).toBe('b')
      expect(calls[1][1] - calls[0][1]).toBeGreaterThan(10)
      expect(calls[2][0]).toBe('c')
      expect(calls[2][1] - calls[1][1]).toBeGreaterThan(10)
    })
  })
})
