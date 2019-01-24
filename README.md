# Understory

Composable utility functions based on or inspired by [lodash](https://lodash.com/docs). For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

Install [ESLint rules for lodash/fp](https://github.com/jfmengels/eslint-plugin-lodash-fp) by extending eslint with `plugin:lodash-fp/recommended` and including the `lodash-fp` plugin.

## callWith

[callWith description]

### Parameters

-   `args` **\[type]** [description]

Returns **\[type]** [description]

## condId

Accepts many [ifFunc, thenFunc] arguments. See \_.cond() for more info.

### Parameters

-   `conditions` **[array][24]** one or more condition arrays [ifFunc, thenFunc]

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

Type: [Function][25]

## isGt

Checks to see if second arg is greater than first. See \_.lt

Type: [Function][25]

### Examples

```javascript
isGt(1)(2) // => true
```

## isLt

Checks to see if second arg is less than first. See \_.gt

Type: [Boolean][26]

### Examples

```javascript
isLt(2)(1) // => true
```

## subtrahend

Subtract two numbers.

### Parameters

-   `subtrahend` **[number][27]** A quantity/number to be subtracted from another.
-   `minuend` **[number][27]** A quantity/number from which another is to be subtracted.

### Examples

```javascript
_.subtrahend(6)(8);
// => 2
_.subtrahend(6, 8);
// => 2
```

Returns **[number][27]** Returns the difference.

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

-   `boolCheck` **[Function][25]** Function that check if value is true.
-   `getTrue` **[Function][25]** Optional. Get value when false.
-   `getFalse`   (optional, default `identity`)

### Examples

```javascript
overBranch(boolCheck, getTrue)
```

Returns **any** Result of getTrue or getFalse.

[1]: #callwith

[2]: #parameters

[3]: #condid

[4]: #parameters-1

[5]: #isfalse

[6]: #parameters-2

[7]: #examples

[8]: #istrue

[9]: #parameters-3

[10]: #examples-1

[11]: #hassize

[12]: #isgt

[13]: #examples-2

[14]: #islt

[15]: #examples-3

[16]: #subtrahend

[17]: #parameters-4

[18]: #examples-4

[19]: #branch

[20]: #parameters-5

[21]: #overbranch

[22]: #parameters-6

[23]: #examples-5

[24]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[25]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[26]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[27]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
