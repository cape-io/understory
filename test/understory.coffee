should = require('chai').should()
understory = require('../understory')

describe 'understory', () ->
  describe '#rm_prefix', () ->
    it 'Removes a string from the left of another. Removes leading slash by default.', () ->
      understory.rm_prefix('/some/long/path', '/some').should.equal('long/path')
    it 'Only remove subject string. Not leading slash', () ->
      understory.rm_prefix('/some/long/path', '/some', false).should.equal('/long/path')
