/**
 * This branded type to allow strong typing of a decimal(int or float) `number` value.
 *
 * A `SafeDecimal` is an integer or float excluding `NaN` & `Infinity`.
 *
 * You can use `isSafeDecimal` to determine a value or assert with `as SafeDecimal` if you're sure.
 *
 * @see {@link https://egghead.io/blog/using-branded-types-in-typescript | Branded types explication}
 */
type SafeDecimal = number & {
    __type: 'SafeDecimal';
};
/**
 * `isSafeDecimal` is a type guard to determine if a value is of type `SafeDecimal`, a `SafeDecimal` is an integer or float excluding `NaN` & `Infinity`.
 */
declare function isSafeDecimal(input: number): input is SafeDecimal;
type DecimalInputReturnType<D extends SafeDecimal | number> = {
    number: D;
    value: string;
    valid: true;
} | {
    number: undefined;
    value: undefined;
    valid: false;
};
type DecimalInputOptions = {
    /** Minimum input number to be valid */
    min?: number;
    /** Maximum input number to be valid */
    max?: number;
    /** Number of decimal input to be valid */
    decimalPlaces?: number;
};
/**
 * `decimalInput` parses & validates a decimal string returning a valid decimal string & number else invalid.
 * @example
```ts
function handleChange(event) {
  const decimal = decimalInput(event.target.value)
  
  if(decimal.valid){
    setInputValue(decimal.value)
    setDecimalValue(decimal.number)
  }
}
```
 */
declare function decimalInput<D extends SafeDecimal | number = SafeDecimal>(
/** Your inputs value */
value: string, options?: DecimalInputOptions): DecimalInputReturnType<D>;
declare function validateDecimal<R extends SafeDecimal | number = SafeDecimal>(input: unknown, opts?: DecimalInputOptions): input is R;
export { decimalInput, isSafeDecimal, validateDecimal };
export type { SafeDecimal };
