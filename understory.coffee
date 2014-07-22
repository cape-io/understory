path = require 'path'

_ = require 'lodash'
_.str = require 'underscore.string'
_.mixin(_.str.exports())
hogan = require 'hogan' # Mustache

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

  token_replace: (t, vars) ->
    # vars must be an object of values that gets sent to mustache.
    unless _.isObject vars
      console.log 'NO vars sent to token_replace'
      return t # Can't replace anything return with original.

    # Loop through all the values in 't' and apply mustache to them.
    if _.isObject t
      t = _.mapValues t, (str) =>
        if _.isString str
          return hogan.compile(str).render(vars)
        else if _.isObject str
          return _.token_replace str, vars
        else
          return str
    else if _.isString t
      t = hogan.compile(t).render(vars)
    else
      console.log 'NOT A STRING OR OBJECT for t in token_replace()'
      console.log t
      console.log vars
    return t

  string_replace: (info) ->
    string = info.string
    if not string
      return null
    if info.toUpperCase
      string = string.toUpperCase()
    # Need to find out why this is here.
    if info.split_on
      string = string.split(info.split_on)
      _.forEach string, (value, i) ->
        if info.trim
          value = _.str.trim value
        if info.find_replace[value]
          string[i] = info.find_replace[value]
    else
      if info.regex
        if not info.regex_options
          info.regex_options = "g"
        re = new RegExp(info.regex, info.regex_options)
        string = string.replace(re, info.replace)
      else if _.isObject info.find_replace
        _.forEach info.find_replace, (new_value, old_value) ->
          string = string.replace old_value, new_value
      else if info.find and info.replace
        string = string.replace info.find, info.replace
    return string

  last_dash: (str) ->
    _.last str.split('-')

_.mixin(path)
_.mixin(understory)

module.exports = _
