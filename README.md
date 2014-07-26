# Understory

Underscore (lodash) + string mixin with some custom, frequently used functions.

## Usage

`var _ = require('understory');`

## lodash Functions

http://lodash.com/docs

## Underscore String Functions

https://github.com/epeli/underscore.string

## String Functions

**token_replace**

**string_replace**

**last_dash**

### Path Functions

**rm_prefix** `_.rm_prefix(str_full, str_prefix, [bool_strip_front_slash])`

Removes a prefix from a path. Optionally remove front slash after prefix is removed.

```javascript
_.rm_prefix('rm_me/please/ok.txt', 'rm_me', true)
=> "please/ok.txt"

_.rm_prefix('somelongstringblah', 'somelong')
=> "stringblah"
```

**dir_i** _.dir_i(str_path)

Explodes path on separator. Does not include filename.

```javascript
_.dir_i('uno/two/trois/file.ext')
=> {
  dirsplit: ['uno', 'two', 'trois']
  dir1: 'uno',
  dir2: 'two',
  dir3: 'trois'
}
```

## Object Functions

**rename**

**pluck**

**clean**

**without**

## Array Functions

**second**

**array_replace**
