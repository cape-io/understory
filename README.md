# Understory

**Version 2 is ESM.**

Importing all of lodash/fp.js [#4296](https://github.com/lodash/lodash/issues/4296)

Composable utility functions based on or inspired by [lodash](https://lodash.com/docs). For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

Install [ESLint rules for lodash/fp](https://github.com/jfmengels/eslint-plugin-lodash-fp) by extending eslint with `plugin:lodash-fp/recommended` and including the `lodash-fp` plugin.

There are also promise enabled varients of `_.flow` as `flowP` and `_.forEach` as `forEachP`.

We call it "understory" because it's close to "underscore" and the understory is the layer of vegetation below the forest canopy.

## branch

Curried function form of a conditional ternary expression

### Parameters

-   `trueVal` **any** The value returned when true.
-   `falseVal` **any** The value returned when false.
-   `bool` **any** The value to check truthiness against.

Returns **any** The trueVal or falseVal depending on bool.

## overBranch

Passes argument to boolCheck function. If true sends same argument to `getTrue` function.

### Parameters

-   `boolCheck` **([Function][37] | any)** Function that check if value is true.
-   `getTrue` **([Function][37] | any)** Get the value when true.
-   `getFalse` **([Function][37] | any)** Optional. Get value when false. (optional, default `identity`)

### Examples

```javascript
overBranch(boolCheck, getTrue)
```

Returns **any** Function that accepts a value and returns result of getTrue or getFalse.

## onTrue

Passes argument to boolCheck function. If true sends same argument to `getTrue` function.

### Parameters

-   `boolCheck` **([Function][37] | any)** Function that check if value is true.
-   `getValue` **([Function][37] | any)** Get the value when true.
-   `item` **([Function][37] | any)** The value sent to boolCheck.

### Examples

```javascript
onTrue(_.isString, _.toUpper)('foo') // => 'FOO'
```

```javascript
onTrue(_.isString, _.toUpper)(45) // => 45
```

Returns **any** Result of getValue when true or the untouched item.

## callWith

[callWith description]

### Parameters

-   `args` **\[type]** [description]

Returns **\[type]** [description]

## condId

-   **See: onTrue if you have one condition.**

Accepts many [boolCheck, onTrue] arguments. See _.cond() for more info.
  The function or exact match to check item against.
  If onTrue is a function it is sent the the value like _.cond()
  If onTrue is not a function the value of onTrue is returned.

### Parameters

-   `conditions` **[array][38]** one or more condition arrays [boolCheck, thenFunc]

Returns **any** Result of found thenFunc or if no conditions found return original.

## isFalse

Returns true if sent a value that is exactly `false`.

### Parameters

-   `value` **any** Send it anything

### Examples

```javascript
isFalse(1) // => false
```

```javascript
isFalse(false) // => true
```

Returns **bool** Tells you if it is exactly false.

## isZero

Returns true if sent a value that is exactly 0.

### Parameters

-   `value` **any** Send it anything

### Examples

```javascript
isZero(0.1) // => false
```

```javascript
isZero(0) // => true
```

Returns **bool** Tells you if it is exactly zero.

## isTrue

Returns true if sent a value that is exactly `false`.

### Parameters

-   `value` **any** Send it anything

### Examples

```javascript
isTrue(1) // => false
```

```javascript
isTrue(true) // => true
```

Returns **bool** Tells you if it is exactly false.

## isWorthless

[isWorthless description]

### Parameters

-   `value` **any**

### Examples

```javascript
isWorthless({}) // => true
```

```javascript
isWorthless([' ', null]) // => true
```

```javascript
isWorthless(' ') // => true
```

```javascript
isWorthless({ foo: null, bar: 0 }) // => true
```

Returns **bool** Tells you if value is empty.

## hasSize

Opposite of `_.isEmpty`.

Type: [Function][37]

## isGt

Checks to see if second arg is greater than first. See \_.lt

Type: [Function][37]

### Examples

```javascript
isGt(1)(2) // => true
```

## isLt

Checks to see if second arg is less than first. See \_.gt

Type: [Boolean][39]

### Examples

```javascript
isLt(2)(1) // => true
```

## subtrahend

Subtract two numbers.

### Parameters

-   `subtrahend` **[number][40]** A quantity/number to be subtracted from another.
-   `minuend` **[number][40]** A quantity/number from which another is to be subtracted.

### Examples

```javascript
_.subtrahend(6)(8);
// => 2
_.subtrahend(6, 8);
// => 2
```

Returns **[number][40]** Returns the difference.

## forEachP

Like \_.forEach but can handle a promise generator as the iteratee.
Iterates over elements of collection and invokes iteratee for each element.
The iteratee is invoked with one argument: (value).
Iteratee functions may NOT exit iteration early.

### Parameters

-   `iteratee` **[Function][37]** The function that should process each item.
-   `collection` **[Array][38]** The iterable. Each val send to func after previous resolves.

Returns **[Promise][41]** The value return value of the last promise.

## mapP

map for Promises. Invokes iteratee in serial sequence instead of all at once.

### Parameters

-   `iteratee` **[Function][37]** The function that should process each item.
-   `collection` **[Array][38]** The iterable. Each val send to func after previous resolves.

Returns **[Promise][41]** The value return value of the last promise.

[1]: #branch

[2]: #parameters

[3]: #overbranch

[4]: #parameters-1

[5]: #examples

[6]: #ontrue

[7]: #parameters-2

[8]: #examples-1

[9]: #callwith

[10]: #parameters-3

[11]: #condid

[12]: #parameters-4

[13]: #isfalse

[14]: #parameters-5

[15]: #examples-2

[16]: #iszero

[17]: #parameters-6

[18]: #examples-3

[19]: #istrue

[20]: #parameters-7

[21]: #examples-4

[22]: #isworthless

[23]: #parameters-8

[24]: #examples-5

[25]: #hassize

[26]: #isgt

[27]: #examples-6

[28]: #islt

[29]: #examples-7

[30]: #subtrahend

[31]: #parameters-9

[32]: #examples-8

[33]: #foreachp

[34]: #parameters-10

[35]: #mapp

[36]: #parameters-11

[37]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[38]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[39]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[40]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[41]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
