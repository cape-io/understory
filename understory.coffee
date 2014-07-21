path = require 'path'

_ = require 'lodash'
_.str = require 'underscore.string'
_.mixin(_.str.exports())

understory =

  # File path related functions.

  rm_prefix: (full_str, prefix, strip_slash = true) ->
    #return _.str.ltrim full_str, prefix # <- too greedy
    if full_str.substring(0, prefix.length) == prefix
      full_str = full_str.substring(prefix.length)
      if strip_slash and '/' == full_str.substring 0, 1
        full_str = full_str.substring 1
    return full_str

  dir_i: (dirname_str) ->
    unless _.isString dirname_str
      return false
    if dirname_str == '.'
      return false

    ret_val =
      dirsplit: dirname_str.split(path.sep)

    _.forEach ret_val.dirsplit, (dir, i) =>
      ret_val["dir" + (i+1)] = dir

    return ret_val

_.mixin(path)
_.mixin(understory)

module.exports = _
