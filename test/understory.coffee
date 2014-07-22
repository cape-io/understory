should = require('chai').should()
understory = require('../understory')

describe 'understory', () ->
  describe '#rm_prefix', () ->
    it 'Removes a string from the left of another. Removes leading slash by default.', () ->
      understory.rm_prefix('/some/long/path', '/some').should.equal('long/path')
    it 'Only remove subject string. Not leading slash', () ->
      understory.rm_prefix('/some/long/path', '/some', false).should.equal('/long/path')

  describe '#string_replace', () ->
    it 'Replaces based regex.', () ->
      info =
        string: "Pique'"
        regex: "e'$"
        replace: 'é'
      understory.string_replace(info).should.equal('Piqué')
    it 'Replaces based on `find` and `replace` props. Upper case before replace.', () ->
      info =
        toUpperCase: true
        string: "jungle book"
        find: "BOOK"
        replace: "child"
      understory.string_replace(info).should.equal('JUNGLE child')
  describe '#last_dash', () ->
    it 'Return part of string after the last dash (-).', () ->
      str = 'some-long-string-last-fun'
      understory.last_dash(str).should.equal('fun')
