# decimal-input

A utils to assist with handling decimal input fields.

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
