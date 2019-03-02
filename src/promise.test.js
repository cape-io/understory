import _ from 'lodash/fp'
import { forEachP, mapP, wait } from './promise'

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
      expect(calls[1][1] - calls[0][1]).toBeGreaterThan(9)
      expect(calls[2][0]).toBe('c')
      expect(calls[2][1] - calls[1][1]).toBeGreaterThan(9)
    })
  })
})
describe('mapP', () => {
  const items = ['a', 'b', 'c', 'd', 'e']
  const asyncFunc = val => wait(11).then(() => ({ val, time: _.now() }))
  test('map in order', () => {
    expect.assertions(5)
    return mapP(asyncFunc, items).then((vals) => {
      expect(vals.length).toBe(5)
      expect(vals[0].val).toBe('a')
      expect(vals[2].val).toBe('c')
      expect(vals[1].time - vals[0].time).toBeGreaterThan(10)
      expect(vals[2].time - vals[1].time).toBeGreaterThan(10)
    })
  })
})
