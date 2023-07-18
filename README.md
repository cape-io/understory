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

*   `trueVal` **any** The value returned when true.
*   `falseVal` **any** The value returned when false.
*   `bool` **any** The value to check truthiness against.

Returns **any** The trueVal or falseVal depending on bool.

## overBranch

Passes argument to boolCheck function. If true sends same argument to `getTrue` function.

### Parameters

*   `boolCheck` **([Function][49] | any)** Function that check if value is true.
*   `getTrue` **([Function][49] | any)** Get the value when true.
*   `getFalse` **([Function][49] | any)** Optional. Get value when false. (optional, default `identity`)

### Examples

```javascript
overBranch(boolCheck, getTrue)
```

Returns **any** Function that accepts a value and returns result of getTrue or getFalse.

## onTrue

Passes argument to boolCheck function. If true sends same argument to `getTrue` function.
Similar to overBranch but no getFalse option.

### Parameters

*   `boolCheck` **([Function][49] | any)** Function that check if value is true.
*   `getValue` **([Function][49] | any)** Get the value when true.
*   `item` **([Function][49] | any)** The value sent to boolCheck.

### Examples

```javascript
onTrue(_.isString, _.toUpper)('foo') // => 'FOO'
```

```javascript
onTrue(_.isString, _.toUpper)(45) // => 45
```

Returns **any** Result of getValue when true or the untouched item.

## callWith

\[callWith description]

### Parameters

*   `args` **\[type]** \[description]

Returns **\[type]** \[description]

## condId

*   **See**: onTrue if you have one condition.

Accepts many \[boolCheck, onTrue] arguments. See \_.cond() for more info.
The function or exact match to check item against.
If onTrue is a function it is sent the the value like \_.cond()
If onTrue is not a function the value of onTrue is returned.

### Parameters

*   `conditions` **[array][50]** one or more condition arrays \[boolCheck, thenFunc]

Returns **any** Result of found thenFunc or if no conditions found return original.

## isFalse

Returns true if sent a value that is exactly `false`.

### Parameters

*   `value` **any** Send it anything

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

*   `value` **any** Send it anything

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

*   `value` **any** Send it anything

### Examples

```javascript
isTrue(1) // => false
```

```javascript
isTrue(true) // => true
```

Returns **bool** Tells you if it is exactly false.

## isWorthless

\[isWorthless description]

### Parameters

*   `value` **any**&#x20;

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

## isValue

If value is truthy, null, zero, or false.

### Parameters

*   `value` **any**&#x20;

Returns **bool** Tells you if arg is a value probably worth keeping.

## hasSize

Opposite of `_.isEmpty`.

Type: [Function][49]

## oneOf

A curried version of \_.includes without a rearg.

Type: [Function][49]

### Examples

```javascript
oneOf([2,3,4])(3) // => true
```

## isGt

Checks to see if second arg is greater than first. See \_.lt

Type: [Function][49]

### Examples

```javascript
isGt(1)(2) // => true
```

## isLt

Checks to see if second arg is less than first. See \_.gt

Type: [Function][49]

### Examples

```javascript
isLt(2)(1) // => true
```

## subtrahend

Subtract two numbers.

### Parameters

*   `subtrahend` **[number][51]** A quantity/number to be subtracted from another.
*   `minuend` **[number][51]** A quantity/number from which another is to be subtracted.

### Examples

```javascript
_.subtrahend(6)(8);
// => 2
_.subtrahend(6, 8);
// => 2
```

Returns **[number][51]** Returns the difference.

## addend

Add two numbers or strings.

### Parameters

*   `addend` **([number][51] | [string][52])** A quantity/number to be added to the end of another.
*   `augend` **([number][51] | [string][52])** A quantity/number from to another is added.

### Examples

```javascript
_.addend('c')('ab');
// => 'abc'
```

Returns **[number][51]** Returns the sum.

## roundTo

Round number with precision.

### Parameters

*   `precision` **[number][51]** The precision to round to.
*   `number` **[number][51]** The number to round.

### Examples

```javascript
round(1)(14.23);
// => 14.2
```

Returns **[number][51]** Returns the rounded number.

## arrayToIndex

Create an index with keys of arr and all values of val.

### Parameters

*   `arr` **[array][50]** \[description]
*   `val` **[Boolean][53]** \[description] (optional, default `true`)

Returns **[Object][54]** \[description]

## forEachP

Like \_.forEach but can handle a promise generator as the iteratee.
Iterates over elements of collection and invokes iteratee for each element.
The iteratee is invoked with one argument: (value).
Iteratee functions may NOT exit iteration early.

### Parameters

*   `iteratee` **[Function][49]** The function that should process each item.
*   `collection` **[Array][50]** The iterable. Each val send to func after previous resolves.

Returns **[Promise][55]** The value return value of the last promise.

## mapP

map for Promises. Invokes iteratee in serial sequence instead of all at once.

### Parameters

*   `iteratee` **[Function][49]** The function that should process each item.
*   `collection` **[Array][50]** The iterable. Each val send to func after previous resolves.

Returns **[Promise][55]** The value return value of the last promise.

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

[25]: #isvalue

[26]: #parameters-9

[27]: #hassize

[28]: #oneof

[29]: #examples-6

[30]: #isgt

[31]: #examples-7

[32]: #islt

[33]: #examples-8

[34]: #subtrahend

[35]: #parameters-10

[36]: #examples-9

[37]: #addend

[38]: #parameters-11

[39]: #examples-10

[40]: #roundto

[41]: #parameters-12

[42]: #examples-11

[43]: #arraytoindex

[44]: #parameters-13

[45]: #foreachp

[46]: #parameters-14

[47]: #mapp

[48]: #parameters-15

[49]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[50]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[51]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[52]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[53]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[54]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[55]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
