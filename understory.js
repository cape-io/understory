var DJ, dj, hogan, path, understory, _;

path = require('path');

_ = require('lodash');

_.str = require('underscore.string');

_.mixin(_.str.exports());

hogan = require('hogan.js');

DJ = require('dot-object');

dj = new DJ();

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
    var ret_val;
    if (!_.isString(dirname_str)) {
      return false;
    }
    if (dirname_str === '.') {
      return false;
    }
    ret_val = {
      dirsplit: dirname_str.split(path.sep)
    };
    _.forEach(ret_val.dirsplit, (function(_this) {
      return function(dir, i) {
        return ret_val["dir" + (i + 1)] = dir;
      };
    })(this));
    return ret_val;
  },
  token_replace: function(t, vars) {
    if (!_.isObject(vars)) {
      return t;
    }
    if (_.isObject(t)) {
      t = _.mapValues(t, (function(_this) {
        return function(str) {
          if (_.isString(str)) {
            return hogan.compile(str).render(vars);
          } else if (_.isObject(str)) {
            return _.token_replace(str, vars);
          } else {
            return str;
          }
        };
      })(this));
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
    if (!_.isArray(info.value)) {
      return null;
    }
    if (!_.isObject(info.find_replace)) {
      return null;
    }
    return _.map(info.value, (function(_this) {
      return function(arr_str) {
        if (info.find_replace[arr_str]) {
          return info.find_replace[arr_str];
        } else {
          return arr_str;
        }
      };
    })(this));
  },
  rename: function(item, rename_obj) {
    if (!(_.isObject(rename_obj) && _.isObject(item))) {
      return item;
    }
    _.each(rename_obj, function(new_key, old_key) {
      dj.move(old_key, new_key, item);
    });
    return item;
  },
  pluck: function(info, pluck) {
    var items, pluck_many;
    items = info.value || info;
    pluck = pluck || info.pluck || false;
    if (!(_.isObject(items) && pluck)) {
      return info;
    }
    pluck_many = function(value) {
      var newObj;
      newObj = {};
      _.each(pluck, function(copy_key, set_key) {
        var new_key, new_value;
        if (_.isString(set_key)) {
          new_key = set_key;
        } else {
          new_key = copy_key;
        }
        new_value = dj.pick(copy_key, value);
        if (new_value) {
          return newObj[new_key] = new_value;
        }
      });
      return newObj;
    };
    if (_.isArray(items)) {
      if (_.isObject(pluck)) {
        items = _.map(items, pluck_many);
      } else {
        items = _.map(items, function(item_obj) {
          return dj.pick(pluck, item_obj);
        });
      }
    } else if (_.isObject(items)) {
      if (_.isString(pluck)) {
        items = dj.pick(pluck, items);
      } else if (_.isObject(pluck)) {
        items = pluck_many(items);
      }
    }
    return items;
  },
  clean: function(item) {
    if (!_.isObject(item)) {
      return item;
    }
    _.each(item, (function(_this) {
      return function(value, id) {
        if (_.isString(value) && _.isEmpty(value)) {
          delete item[id];
        } else if (value === null) {
          delete item[id];
        } else if (_.isArray(value) && _.isEmpty(_.compact(value))) {
          delete item[id];
        } else if (_.isObject(value) && !(value instanceof Date) && _.isEmpty(value)) {
          delete item[id];
        }
      };
    })(this));
    return item;
  },
  without: function(items, without) {
    if (_.isString(without)) {
      without = [without];
    }
    if (_.isArray(items)) {
      items = _.map(items, (function(_this) {
        return function(item) {
          return _this.without(item, without);
        };
      })(this));
    } else if (_.isObject(items)) {
      _.each(without, function(rm_field_id) {
        return delete items[rm_field_id];
      });
    }
    return items;
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
  },
  not: function(thing) {
    return !thing;
  },
  upper: function(str) {
    if (_.isString(str)) {
      return str.toUpperCase();
    } else {
      return str;
    }
  }
};

_.mixin(path);

_.mixin(understory);

module.exports = _;
