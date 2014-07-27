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

    it 'Can do a bunch of find replace based on an `find_replace` property object. Can use `value` prop instead of `string`', () ->
      info =
        value: 'a D'
        toUpperCase: true
        find_replace:
          A: 'Accessories'
          D: 'Draperies'
      understory.string_replace(info).should.equal('Accessories Draperies')

  describe '#array_replace', () ->
    it 'Replaces value of each array item if found in replace object.', () ->
      info =
        value: ['A', 'D', 'S', 'SC']
        find_replace:
          A: 'Accessories'
          D: 'Draperies'
          SC: 'Slip Covers'
          S: 'Sheer'
      understory.array_replace(info).should.eql(['Accessories', 'Draperies', 'Sheer', 'Slip Covers'])

  describe '#last_dash', () ->
    it 'Return part of string after the last dash (-).', () ->
      str = 'some-long-string-last-fun'
      understory.last_dash(str).should.equal('fun')

  describe '#token_replace', () ->
    value_obj =
      action: 'DANCE!'
      me: 'someone'
    it 'Does a mustache replace on a string.', () ->
      template_str = 'Kai is to {{action}}'
      token_rep = understory.token_replace(template_str, value_obj)
      token_rep.should.equal('Kai is to DANCE!')
    it 'Does a mustache replace on an object.', () ->
      template_obj =
        one: 'replace {{me}}'
        two:
          three: 'Dance with {{me}} please.'
      token_rep = understory.token_replace(template_obj, value_obj)
      token_rep.one.should.equal('replace someone')
      token_rep.two.three.should.equal('Dance with someone please.')

  describe '#split', () ->
    it 'Does a default split on a string on spaces.', () ->
      understory.split('one two').should.eql(['one', 'two'])
    it 'When sent an object `string` is require or returns null', () ->
      result = understory.split({split_on: ' '})
      should.equal(result, null);
    it 'Return empty array as null', () ->
      result = understory.split({string: 'a', split_on: 'a'})
      should.equal(result, null);
    it 'When string has extra space return it as expected.', () ->
      result = understory.split(' something  two ')
      result.should.eql([ '', 'something', '', 'two', '' ])
    it 'Allows an object with string property. If split_on not found use split_on_sub.', () ->
      result = understory.split({string: 'something , two', split_on: '5', split_on_sub: ' , '})
      result.should.eql(['something', 'two'])
    it 'Trims each result when trim prop is truthy.', () ->
      result = understory.split({string: 'something , two', split_on: ',', trim: true})
      result.should.eql(['something', 'two'])
    it 'Returns value of single index when found.', () ->
      result = understory.split({string: 'something,two', split_on: ',', index: 1})
      result.should.equal('two')
    it 'Returns null when no key of index is found.', () ->
      result = understory.split({string: 'something,two', split_on: ',', index: 2})
      should.equal(result, null);
    it 'Will uppercase the string before split if told to.', () ->
      result = understory.split({string: ' A,  B  , C ', trim: true, split_on: ','})
      result.should.eql(['A', 'B', 'C'])

  describe '#rename', () ->
    it 'Renames props of an object based on another.', () ->
      source =
        itch: 'yes'
        knee: 'no'
        sun: 'sure'
        she: 'always'
      rename_obj =
        knee: 'toe'
        sun: 'moon'
      should_eql =
        itch: 'yes'
        toe: 'no'
        moon: 'sure'
        she: 'always'
      understory.rename(source, rename_obj).should.eql(should_eql)

  describe '#pluck', () ->
    source_obj =
      itch: 'yes'
      knee: 'no'
      sun: 'sure'
      she: 'always'
      other:
        deep: 'kiss'
        act: 'lick'
    it 'Does the same thing as lodash. Return single field when pluck is a string.', () ->
      understory.pluck(source_obj, 'other.deep').should.equal('kiss')

    it 'Allows you to pick more than one field.', () ->
      understory.pluck(source_obj, ['knee', 'sun']).should.eql {knee:'no',sun:'sure'}

    it 'Pluck and rename at the same time.', () ->
      understory.pluck(source_obj, {toe: 'other.act'}).should.eql {toe:'lick'}

    it 'Works with arrays of items the same as it does for a single object.', () ->
      understory.pluck([source_obj, source_obj], ['knee', 'sun']).should.eql [{knee:'no',sun:'sure'},{knee:'no',sun:'sure'}]

  describe '#clean', () ->
    ugly_obj =
      descriptions: ['', 'sam']
      meta: ['', '', '']
      empty_str: ''
      empty_arr: []
      empty_obj: {}
      false_val: false
      true_val: true
      null_val: null
    clean_obj =
      descriptions: ugly_obj.descriptions
      false_val: false
      true_val: true

    it 'Cleans up an object of fields', () ->
      understory.clean(ugly_obj).should.eql clean_obj

  describe '#without', () ->
    item =
      bunch: 'oh'
      fields: 'yup'
      more: 'yes'

    it 'Removes object field/props based on array.', () ->
      item_obj = understory.clone item
      understory.without(item_obj, ['fields', 'more']).should.eql({bunch:'oh'})

    it 'Removes object field/props based on string.', () ->
      item_obj = understory.clone item
      understory.without(item_obj, 'fields').should.eql({bunch:'oh', more:'yes'})

    it 'Removes props on an array of objects.', () ->
      items = [item, item, item]
      understory.without(items, ['fields', 'more']).should.eql([{bunch:'oh'},{bunch:'oh'},{bunch:'oh'}])
