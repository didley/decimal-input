/**
 * A branded type to allow strong typing of a decimal(int or float) `number` value.
 *
 * You can use `isSafeDecimal` to determine if a value or assert with `as SafeDecimal` if you're sure.
 *
 * @see {@link https://egghead.io/blog/using-branded-types-in-typescript | Branded types explication}
 */
type SafeDecimal = number & {
    __type: 'SafeDecimal';
};
type DecimalInputReturnType<F extends SafeDecimal | number> = {
    float: F;
    value: string;
    valid: true;
} | {
    float: undefined;
    value: undefined;
    valid: false;
};
type Options = {
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
    setFloatValue(decimal.float)
  }
}
```
 */
declare function decimalInput<F extends SafeDecimal | number = SafeDecimal>(
/** Your inputs value */
value: string, opts?: Options): DecimalInputReturnType<F>;
declare function validateFloat<R extends SafeDecimal | number = SafeDecimal>(input: unknown, opts?: Options): input is R;
declare function isSafeDecimal(input: number): input is SafeDecimal;
export { decimalInput, isSafeDecimal, validateFloat };
export type { SafeDecimal };
