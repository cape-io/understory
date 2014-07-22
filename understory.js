// Generated by CoffeeScript 1.6.3
var hogan, path, understory, _;

path = require('path');

_ = require('lodash');

_.str = require('underscore.string');

_.mixin(_.str.exports());

hogan = require('hogan');

understory = {
  rm_prefix: function(full_str, prefix, strip_slash) {
    if (strip_slash == null) {
      strip_slash = true;
    }
    if (full_str.substring(0, prefix.length) === prefix) {
      full_str = full_str.substring(prefix.length);
      if (strip_slash && '/' === full_str.substring(0, 1)) {
        full_str = full_str.substring(1);
      }
    }
    return full_str;
  },
  dir_i: function(dirname_str) {
    var ret_val,
      _this = this;
    if (!_.isString(dirname_str)) {
      return false;
    }
    if (dirname_str === '.') {
      return false;
    }
    ret_val = {
      dirsplit: dirname_str.split(path.sep)
    };
    _.forEach(ret_val.dirsplit, function(dir, i) {
      return ret_val["dir" + (i + 1)] = dir;
    });
    return ret_val;
  },
  token_replace: function(t, vars) {
    var _this = this;
    if (!_.isObject(vars)) {
      return t;
    }
    if (_.isObject(t)) {
      t = _.mapValues(t, function(str) {
        if (_.isString(str)) {
          return hogan.compile(str).render(vars);
        } else if (_.isObject(str)) {
          return _.token_replace(str, vars);
        } else {
          return str;
        }
      });
    } else if (_.isString(t)) {
      t = hogan.compile(t).render(vars);
    }
    return t;
  },
  string_replace: function(info) {
    var re, string;
    if (info.value && _.isString(info.value)) {
      info.string = info.value;
    }
    string = info.string;
    if (!string) {
      return null;
    }
    if (info.toUpperCase) {
      string = string.toUpperCase();
    }
    if (info.regex) {
      if (!info.regex_options) {
        info.regex_options = "g";
      }
      re = new RegExp(info.regex, info.regex_options);
      string = string.replace(re, info.replace);
    } else if (_.isObject(info.find_replace)) {
      _.forEach(info.find_replace, function(new_value, old_value) {
        return string = string.replace(old_value, new_value);
      });
    } else if (info.find && info.replace) {
      string = string.replace(info.find, info.replace);
    }
    return string;
  },
  array_replace: function(info) {
    var _this = this;
    if (!_.isArray(info.value)) {
      return null;
    }
    if (!_.isObject(info.find_replace)) {
      return null;
    }
    return _.map(info.value, function(arr_str) {
      if (info.find_replace[arr_str]) {
        return info.find_replace[arr_str];
      } else {
        return arr_str;
      }
    });
  },
  split: function(info) {
    var new_array, split_on, split_on_sub, string_to_split;
    if (_.isString(info)) {
      string_to_split = info;
    } else if (info.string) {
      string_to_split = info.string;
    } else {
      return null;
    }
    split_on = info.split_on || ' ';
    split_on_sub = info.split_on_sub || false;
    if (!string_to_split || _.isEmpty(string_to_split)) {
      return null;
    }
    if (split_on_sub && !_.contains(string_to_split, split_on)) {
      split_on = split_on_sub;
    }
    new_array = string_to_split.split(split_on);
    if (_.isEmpty(_.compact(new_array))) {
      return null;
    }
    if (info.trim) {
      new_array = _.map(new_array, function(arr_val) {
        return _.str.trim(arr_val);
      });
    }
    if (info.index) {
      if (new_array[info.index]) {
        return new_array[info.index];
      } else {
        return null;
      }
    }
    return new_array;
  },
  last_dash: function(str) {
    return _.last(str.split('-'));
  },
  second: function(arr) {
    return arr[1];
  },
  third: function(arr) {
    return arr[2];
  },
  fourth: function(arr) {
    return arr[3];
  }
};

_.mixin(path);

_.mixin(understory);

module.exports = _;
