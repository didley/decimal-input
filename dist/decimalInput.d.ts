/**
 * A branded type to allow strong typing of a decimal(float) value.
 *
 * You can use `isSafeIntOrFloat` to determine if a value or assert with `as SafeIntOrFloat` if you're sure.
 *
 * @see {@link https://egghead.io/blog/using-branded-types-in-typescript | Branded types explication}
 */
type SafeIntOrFloat = number & {
    __type: 'SafeIntOrFloat';
};
type DecimalInputReturnType<F extends SafeIntOrFloat | number> = {
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
declare function decimalInput<F extends SafeIntOrFloat | number = SafeIntOrFloat>(
/** Your inputs value */
value: string, opts?: Options): DecimalInputReturnType<F>;
declare function validateFloat<R extends SafeIntOrFloat | number = SafeIntOrFloat>(input: unknown, opts?: Options): input is R;
declare function isSafeIntOrFloat(input: number): input is SafeIntOrFloat;
export { decimalInput, isSafeIntOrFloat, validateFloat };
export type { SafeIntOrFloat };
