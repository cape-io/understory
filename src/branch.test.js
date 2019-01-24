import { branch } from '.'

/* globals describe test expect */
describe('branch', () => {
  const func1 = branch('happy', 'sad')
  test('Return 1st arg when true', () => {
    expect(func1(true)).toEqual('happy')
  })
  test('Return 2nd arg when false', () => {
    expect(func1(false)).toEqual('sad')
  })
})
