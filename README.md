# Understory

Composable utility functions based on or inspired by [lodash](https://lodash.com/docs). For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

Install [ESLint rules for lodash/fp](https://github.com/jfmengels/eslint-plugin-lodash-fp) by extending eslint with `plugin:lodash-fp/recommended` and including the `lodash-fp` plugin.

## branch

Curried function form of a conditional ternary expression

### Parameters

-   `trueVal` **any** The value return when true.
-   `falseVal` **any** The value returned when false.
-   `bool` **any** The value to check truthiness against.

Returns **any** The trueVal or falseVal depending on bool.

## condId

Accepts many [ifFunc, thenFunc] arguments. See \_.cond() for more info.

### Parameters

-   `conditions` **[array][19]** one or more condition arrays [ifFunc, thenFunc]

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

Type: [Function][20]

## isGt

Checks to see if second arg is greater than first. See \_.lt

Type: [Function][20]

### Examples

```javascript
isGt(1)(2) // => true
```

## isLt

Checks to see if second arg is less than first. See \_.gt

Type: [Boolean][21]

### Examples

```javascript
isLt(2)(1) // => true
```

## overBranch

Passes argument to boolCheck function. If true sends same argument to `getTrue` function.

### Parameters

-   `boolCheck` **[Function][20]** Function that check if value is true.
-   `getTrue` **[Function][20]** Optional. Get value when false.
-   `getFalse`   (optional, default `identity`)

### Examples

```javascript
overBranch(boolCheck, getTrue)
```

Returns **any** Result of getTrue or getFalse.

[1]: #branch

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

[16]: #overbranch

[17]: #parameters-4

[18]: #examples-4

[19]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[21]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
