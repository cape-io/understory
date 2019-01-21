import _ from 'lodash/fp'
import overBranch from './overBranch'

/* globals describe test expect */
describe('overBranch', () => {
  const func1 = overBranch(_.isString, _.toUpper)
  test('When string uppercase', () => {
    expect(func1('abc')).toEqual('ABC')
  })
  test('ignore number', () => {
    expect(func1(1)).toEqual(1)
  })
  const func2 = overBranch(_.isString, _.toUpper, _.constant('No'))
  test('not string return NO', () => {
    expect(func2(1)).toEqual('No')
    expect(func2([])).toEqual('No')
    expect(func2({})).toEqual('No')
  })
  // const obj2Arr = overBranch(_.isPlainObject, Array)
})
