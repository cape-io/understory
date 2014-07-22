// Generated by CoffeeScript 1.6.3
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
    return it('Replaces based on `find` and `replace` props. Upper case before replace.', function() {
      var info;
      info = {
        toUpperCase: true,
        string: "jungle book",
        find: "BOOK",
        replace: "child"
      };
      return understory.string_replace(info).should.equal('JUNGLE child');
    });
  });
  return describe('#last_dash', function() {
    return it('Return part of string after the last dash (-).', function() {
      var str;
      str = 'some-long-string-last-fun';
      return understory.last_dash(str).should.equal('fun');
    });
  });
});
