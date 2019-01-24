# Understory

Composable utility functions based on or inspired by [lodash](https://lodash.com/docs). For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

Install [ESLint rules for lodash/fp](https://github.com/jfmengels/eslint-plugin-lodash-fp) by extending eslint with `plugin:lodash-fp/recommended` and including the `lodash-fp` plugin.


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

-   `boolCheck` **[Function][26]** Function that check if value is true.
-   `getTrue` **[Function][26]** Optional. Get value when false.
-   `getFalse`   (optional, default `identity`)

### Examples

```javascript
overBranch(boolCheck, getTrue)
```

Returns **any** Result of getTrue or getFalse.

## callWith

[callWith description]

### Parameters

-   `args` **\[type]** [description]

Returns **\[type]** [description]

## condId

Accepts many [ifFunc, thenFunc] arguments. See \_.cond() for more info.

### Parameters

-   `conditions` **[array][27]** one or more condition arrays [ifFunc, thenFunc]

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

## hasSize

Opposite of `_.isEmpty`.

Type: [Function][26]

## isGt

Checks to see if second arg is greater than first. See \_.lt

Type: [Function][26]

### Examples

```javascript
isGt(1)(2) // => true
```

## isLt

Checks to see if second arg is less than first. See \_.gt

Type: [Boolean][28]

### Examples

```javascript
isLt(2)(1) // => true
```

## subtrahend

Subtract two numbers.

### Parameters

-   `subtrahend` **[number][29]** A quantity/number to be subtracted from another.
-   `minuend` **[number][29]** A quantity/number from which another is to be subtracted.

### Examples

```javascript
_.subtrahend(6)(8);
// => 2
_.subtrahend(6, 8);
// => 2
```

Returns **[number][29]** Returns the difference.

## forEachP

Like \_.forEach but can handle a promise generator as the iteratee.
Iterates over elements of collection and invokes iteratee for each element.
The iteratee is invoked with one argument: (value).
Iteratee functions may NOT exit iteration early.

### Parameters

-   `iteratee` **[Function][26]** The function that should process each item.
-   `collection` **[Array][27]** The iterable. Each val send to func after previous resolves.

Returns **[Promise][30]** The value return value of the last promise.

[1]: #branch

[2]: #parameters

[3]: #overbranch

[4]: #parameters-1

[5]: #examples

[6]: #callwith

[7]: #parameters-2

[8]: #condid

[9]: #parameters-3

[10]: #isfalse

[11]: #parameters-4

[12]: #examples-1

[13]: #istrue

[14]: #parameters-5

[15]: #examples-2

[16]: #hassize

[17]: #isgt

[18]: #examples-3

[19]: #islt

[20]: #examples-4

[21]: #subtrahend

[22]: #parameters-6

[23]: #examples-5

[24]: #foreachp

[25]: #parameters-7

[26]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[27]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[28]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[29]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[30]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
