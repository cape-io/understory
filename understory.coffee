path = require 'path'

_ = require 'lodash'
_.str = require 'underscore.string'
_.mixin(_.str.exports())

hogan = require 'hogan' # Mustache
DJ = require 'dot-object'
dj = new DJ()

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
      # Can't replace anything return with original.
      # console.log 'NO vars sent to token_replace'
      return t

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
    # else
    #   console.log 'NOT A STRING OR OBJECT for t in token_replace()'
    #   console.log t
    #   console.log vars
    # else # Check to see if it has mustache.
    #   # Value after processing for mustache with empty variables.
    #   tre = _.token_replace field.arg.string, {}
    #   # Value after processing with full variables.
    #   tr = _.token_replace field.arg.string, item
    #   # The string has changed and it is not the same as when empty variables.
    #   if tr and tr != field.arg.string and tr != tre
    #     field.arg.string = tr

    return t

  string_replace: (info) ->
    if info.value and _.isString info.value
      info.string = info.value

    string = info.string
    if not string
      return null
    if info.toUpperCase
      string = string.toUpperCase()
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

  array_replace: (info) ->
    unless _.isArray info.value
      return null
    unless _.isObject info.find_replace
      return null

    return _.map info.value, (arr_str) =>
      if info.find_replace[arr_str]
        return info.find_replace[arr_str]
      else
        return arr_str

  rename: (item, rename_obj) ->
    unless _.isObject(rename_obj) and _.isObject(item)
      return item
    _.each rename_obj, (new_key, old_key) ->
      dj.move old_key, new_key, item
      return
    return item

  pluck: (info, pluck) ->
    items = info.value or info
    pluck = pluck or info.pluck or false
    unless _.isObject(items) and pluck
      return info
    pluck_many = (value) ->
      newObj = {}
      _.each pluck, (copy_key, set_key) ->
        if _.isString set_key
          new_key = set_key
        else
          new_key = copy_key
        new_value = dj.pick copy_key, value
        if new_value
          #dj.str new_key, new_value, newObj
          newObj[new_key] = new_value
      return newObj
    if _.isArray items
      if _.isObject pluck
        items = _.map items, pluck_many
      else
        items = _.map items, (item_obj) ->
          dj.pick pluck, item_obj
    else if _.isObject items
      if _.isString pluck
        items = dj.pick pluck, items
      else if _.isObject pluck
        items = pluck_many items
      # else
      #   items = _.mapValues items, (item_obj) ->
      #     dj.pick item_obj, pluck
    return items

  # Remove unwanted fields from an object.
  clean: (item) ->
    unless _.isObject item
      return item
    _.each item, (value, id) =>
      if _.isString(value) and _.isEmpty(value)
        delete item[id]
      else if value == null
        delete item[id]
      else if _.isArray(value) and _.isEmpty(_.compact(value))
        delete item[id]
      else if _.isObject(value) and not(value instanceof Date) and _.isEmpty(value)
        delete item[id]
      return
    return item

  # Remove any fields we don't need.
  without: (items, without) ->
    if _.isString without
      without = [without]
    if _.isArray(items)
      items = _.map items, (item) =>
        return @without item, without
    else if _.isObject items
      _.each without, (rm_field_id) ->
        delete items[rm_field_id]
    return items

  # Split string into array based on ' '
  split: (info) ->
    if _.isString info
      string_to_split = info
    else if info.string
      string_to_split = info.string
    else
      return null

    split_on = info.split_on or ' '
    split_on_sub = info.split_on_sub or false

    if not string_to_split or _.isEmpty string_to_split
      return null

    if split_on_sub and not _.contains(string_to_split, split_on)
      split_on = split_on_sub

    new_array = string_to_split.split(split_on)

    # Return empty arrays as null.
    if _.isEmpty(_.compact(new_array))
      return null

    # Optionally trim each value.
    if info.trim
      new_array = _.map new_array, (arr_val) ->
        # Not sure why this needs to be a func like this and not a direct map.
        return _.str.trim(arr_val)

    if info.index
      if new_array[info.index]
        return new_array[info.index]
      else
        return null

    return new_array

  last_dash: (str) ->
    _.last str.split('-')

  # Convert to nth() function.
  second: (arr) ->
    arr[1]
  third: (arr) ->
    arr[2]
  fourth: (arr) ->
    arr[3]


_.mixin(path)
_.mixin(understory)

module.exports = _
