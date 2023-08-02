# decimal-input

Utils to assist with handling decimal input fields.

## Purpose

Dealing with decimal inputs can be tedious. As all HTML inputs are `string`s you need to manage two values, one for the inputs `string` value and the other for parsed decimal(float) `number`. Both need to be validated with the same validation, and the input needs to reflect the parsed `number`. A user could input `NaN` while typing a decimal eg. `Number('.')// NaN` or the parsed `number` may not reflect the input value eg. `Number('.1')// 0.1`. 

These utils ensure both values are parsed & validated correctly with helpful optional min, max & decimal place options. It also includes additional helpers to ensure your decimal values are strongly typed with the `SafeIntOrFloat` branded type.

## Installing

```shell
# NPM
npm install @didley/decimal-input
# Yarn
yarn add @didley/decimal-input
```

## `decimalInput`

`decimalInput` parses & validates a decimal string returning a valid decimal string & number else invalid. Generally you'll want to make your input have a controlled value and only update it and your stored float when `decimalInput`s return value is `true`.

### `decimalInput` example

```ts
function handleChange(event) {
  const decimal = decimalInput(event.target.value);

  if (decimal.valid) {
    setInputValue(decimal.value);
    setFloatValue(decimal.float);
  }
}
```

### `decimalInput` function definition

```ts
function decimalInput<T extends SafeIntOrFloat | number = SafeIntOrFloat>(
  /** Your inputs value */
  value: string,
  options?: {
    /** Minimum input number to be valid */
    min?: number;
    /** Maximum input number to be valid */
    max?: number;
    /** Number of decimal input to be valid */
    decimalPlaces?: number;
  }
):
  | {
      float: T;
      value: string;
      valid: true;
    }
  | {
      float: undefined;
      value: undefined;
      valid: false;
    };
```

## `DecimalUtil.validateFloat`

`validateFloat` is the same float validation used within `decimalInput`. Useful when requiring the same validation outside of `decimalInput`.

## `DecimalUtil.isSafeIntOrFloat`

`isSafeIntOrFloat` is a type guard to determine if a value is of type `SafeIntOrFloat`

## `SafeIntOrFloat` type

A branded type to allow strong typing of a decimal(float) value.

You can use `isSafeIntOrFloat` to determine if a value or assert with `as SafeIntOrFloat` if you're sure.

see [Branded types explication](https://egghead.io/blog/using-branded-types-in-typescript)
