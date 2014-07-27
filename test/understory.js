var should, understory;

should = require('chai').should();

understory = require('../understory');

describe('understory', function() {
  describe('#rm_prefix', function() {
    it('Removes a string from the left of another. Removes leading slash by default.', function() {
      return understory.rm_prefix('/some/long/path', '/some').should.equal('long/path');
    });
    return it('Only remove subject string. Not leading slash', function() {
      return understory.rm_prefix('/some/long/path', '/some', false).should.equal('/long/path');
    });
  });
  describe('#string_replace', function() {
    it('Replaces based regex.', function() {
      var info;
      info = {
        string: "Pique'",
        regex: "e'$",
        replace: 'é'
      };
      return understory.string_replace(info).should.equal('Piqué');
    });
    it('Replaces based on `find` and `replace` props. Upper case before replace.', function() {
      var info;
      info = {
        toUpperCase: true,
        string: "jungle book",
        find: "BOOK",
        replace: "child"
      };
      return understory.string_replace(info).should.equal('JUNGLE child');
    });
    return it('Can do a bunch of find replace based on an `find_replace` property object. Can use `value` prop instead of `string`', function() {
      var info;
      info = {
        value: 'a D',
        toUpperCase: true,
        find_replace: {
          A: 'Accessories',
          D: 'Draperies'
        }
      };
      return understory.string_replace(info).should.equal('Accessories Draperies');
    });
  });
  describe('#array_replace', function() {
    return it('Replaces value of each array item if found in replace object.', function() {
      var info;
      info = {
        value: ['A', 'D', 'S', 'SC'],
        find_replace: {
          A: 'Accessories',
          D: 'Draperies',
          SC: 'Slip Covers',
          S: 'Sheer'
        }
      };
      return understory.array_replace(info).should.eql(['Accessories', 'Draperies', 'Sheer', 'Slip Covers']);
    });
  });
  describe('#last_dash', function() {
    return it('Return part of string after the last dash (-).', function() {
      var str;
      str = 'some-long-string-last-fun';
      return understory.last_dash(str).should.equal('fun');
    });
  });
  describe('#token_replace', function() {
    var value_obj;
    value_obj = {
      action: 'DANCE!',
      me: 'someone'
    };
    it('Does a mustache replace on a string.', function() {
      var template_str, token_rep;
      template_str = 'Kai is to {{action}}';
      token_rep = understory.token_replace(template_str, value_obj);
      return token_rep.should.equal('Kai is to DANCE!');
    });
    return it('Does a mustache replace on an object.', function() {
      var template_obj, token_rep;
      template_obj = {
        one: 'replace {{me}}',
        two: {
          three: 'Dance with {{me}} please.'
        }
      };
      token_rep = understory.token_replace(template_obj, value_obj);
      token_rep.one.should.equal('replace someone');
      return token_rep.two.three.should.equal('Dance with someone please.');
    });
  });
  describe('#split', function() {
    it('Does a default split on a string on spaces.', function() {
      return understory.split('one two').should.eql(['one', 'two']);
    });
    it('When sent an object `string` is require or returns null', function() {
      var result;
      result = understory.split({
        split_on: ' '
      });
      return should.equal(result, null);
    });
    it('Return empty array as null', function() {
      var result;
      result = understory.split({
        string: 'a',
        split_on: 'a'
      });
      return should.equal(result, null);
    });
    it('When string has extra space return it as expected.', function() {
      var result;
      result = understory.split(' something  two ');
      return result.should.eql(['', 'something', '', 'two', '']);
    });
    it('Allows an object with string property. If split_on not found use split_on_sub.', function() {
      var result;
      result = understory.split({
        string: 'something , two',
        split_on: '5',
        split_on_sub: ' , '
      });
      return result.should.eql(['something', 'two']);
    });
    it('Trims each result when trim prop is truthy.', function() {
      var result;
      result = understory.split({
        string: 'something , two',
        split_on: ',',
        trim: true
      });
      return result.should.eql(['something', 'two']);
    });
    it('Returns value of single index when found.', function() {
      var result;
      result = understory.split({
        string: 'something,two',
        split_on: ',',
        index: 1
      });
      return result.should.equal('two');
    });
    it('Returns null when no key of index is found.', function() {
      var result;
      result = understory.split({
        string: 'something,two',
        split_on: ',',
        index: 2
      });
      return should.equal(result, null);
    });
    return it('Will uppercase the string before split if told to.', function() {
      var result;
      result = understory.split({
        string: ' A,  B  , C ',
        trim: true,
        split_on: ','
      });
      return result.should.eql(['A', 'B', 'C']);
    });
  });
  describe('#rename', function() {
    return it('Renames props of an object based on another.', function() {
      var rename_obj, should_eql, source;
      source = {
        itch: 'yes',
        knee: 'no',
        sun: 'sure',
        she: 'always'
      };
      rename_obj = {
        knee: 'toe',
        sun: 'moon'
      };
      should_eql = {
        itch: 'yes',
        toe: 'no',
        moon: 'sure',
        she: 'always'
      };
      return understory.rename(source, rename_obj).should.eql(should_eql);
    });
  });
  describe('#pluck', function() {
    var source_obj;
    source_obj = {
      itch: 'yes',
      knee: 'no',
      sun: 'sure',
      she: 'always',
      other: {
        deep: 'kiss',
        act: 'lick'
      }
    };
    it('Does the same thing as lodash. Return single field when pluck is a string.', function() {
      return understory.pluck(source_obj, 'other.deep').should.equal('kiss');
    });
    it('Allows you to pick more than one field.', function() {
      return understory.pluck(source_obj, ['knee', 'sun']).should.eql({
        knee: 'no',
        sun: 'sure'
      });
    });
    it('Pluck and rename at the same time.', function() {
      return understory.pluck(source_obj, {
        toe: 'other.act'
      }).should.eql({
        toe: 'lick'
      });
    });
    return it('Works with arrays of items the same as it does for a single object.', function() {
      return understory.pluck([source_obj, source_obj], ['knee', 'sun']).should.eql([
        {
          knee: 'no',
          sun: 'sure'
        }, {
          knee: 'no',
          sun: 'sure'
        }
      ]);
    });
  });
  describe('#clean', function() {
    var clean_obj, ugly_obj;
    ugly_obj = {
      descriptions: ['', 'sam'],
      meta: ['', '', ''],
      empty_str: '',
      empty_arr: [],
      empty_obj: {},
      false_val: false,
      true_val: true,
      null_val: null
    };
    clean_obj = {
      descriptions: ugly_obj.descriptions,
      false_val: false,
      true_val: true
    };
    return it('Cleans up an object of fields', function() {
      return understory.clean(ugly_obj).should.eql(clean_obj);
    });
  });
  return describe('#without', function() {
    var item;
    item = {
      bunch: 'oh',
      fields: 'yup',
      more: 'yes'
    };
    it('Removes object field/props based on array.', function() {
      var item_obj;
      item_obj = understory.clone(item);
      return understory.without(item_obj, ['fields', 'more']).should.eql({
        bunch: 'oh'
      });
    });
    it('Removes object field/props based on string.', function() {
      var item_obj;
      item_obj = understory.clone(item);
      return understory.without(item_obj, 'fields').should.eql({
        bunch: 'oh',
        more: 'yes'
      });
    });
    return it('Removes props on an array of objects.', function() {
      var items;
      items = [item, item, item];
      return understory.without(items, ['fields', 'more']).should.eql([
        {
          bunch: 'oh'
        }, {
          bunch: 'oh'
        }, {
          bunch: 'oh'
        }
      ]);
    });
  });
});
