type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * This branded type to allow strong typing of a decimal(int or float) `number` value.
 *
 * A `SafeDecimal` is an integer or float excluding `NaN` & `Infinity`.
 *
 * You can use `isSafeDecimal` to determine a value or assert with `as SafeDecimal` if you're sure.
 *
 * @see {@link https://egghead.io/blog/using-branded-types-in-typescript | Branded types explication}
 */
type SafeDecimal = number & { __type: 'SafeDecimal' };

/**
 * `isSafeDecimal` is a type guard to determine if a value is of type `SafeDecimal`, a `SafeDecimal` is an integer or float excluding `NaN` & `Infinity`.
 */
function isSafeDecimal(input: number, digits?: Digits): input is SafeDecimal {
  const withinDigits =
    digits !== undefined ? isWithinDecimalDigits(input, digits) : true;

  return (
    (isFloat(input) || Number.isInteger(input)) &&
    Number.isFinite(input) &&
    withinDigits
  );

  function isFloat(n: number): boolean {
    return Number(n) === n && n % 1 !== 0;
  }
}

type DecimalInputReturnType<D extends SafeDecimal | number> =
  | {
      number: D;
      value: string;
      valid: true;
    }
  | {
      number: undefined;
      value: undefined;
      valid: false;
    };

type DecimalInputOptions = {
  /** Minimum input number to be valid */
  min?: number;
  /** Maximum input number to be valid */
  max?: number;
  /** Number of decimal places for input to be valid, defaults to 2 */
  digits?: Digits;
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
function decimalInput<D extends SafeDecimal | number = SafeDecimal>(
  /** Your inputs value */
  value: string,
  options: DecimalInputOptions = {}
): DecimalInputReturnType<D> {
  const parsedValue = parseInput(value);
  const number = Number(parsedValue);

  const valid =
    validateInput(parsedValue, options.digits) &&
    validateDecimal(number, options);

  return valid
    ? { number: number as D, value: parsedValue, valid }
    : { number: undefined, value: undefined, valid: false };
}

function validateDecimal<R extends SafeDecimal | number = SafeDecimal>(
  input: unknown,
  opts: DecimalInputOptions = {}
): input is R {
  if (typeof input !== 'number') {
    return false;
  }

  const withinMin = opts.min === undefined ? true : input >= opts.min;
  const withinMax = opts.max === undefined ? true : input <= opts.max;
  const withinDecimalPlace =
    opts.digits === undefined
      ? true
      : isWithinDecimalDigits(input, opts.digits);

  return withinMin && withinMax && withinDecimalPlace && isSafeDecimal(input);
}

function validateInput(input: string, decimalPlaces?: number): boolean {
  const asNum = Number(input);

  return (
    input.trim() === '.' ||
    (isSafeDecimal(asNum) &&
      input.trim() !== '00' &&
      input.trim().split('.')[1] !== '00' &&
      isWithinDecimalDigits(input, decimalPlaces))
  );
}

function parseInput(input: string): string {
  let parsed = input.trim();

  const startsWithDecimalPoint = parsed[0] === '.';

  if (startsWithDecimalPoint && parsed !== '0.') {
    parsed = '0' + parsed;
  } else if (hasLeadingZeros()) {
    while (hasLeadingZeros()) {
      parsed = parsed.substring(1);
    }
  }

  return parsed;

  function hasLeadingZeros(): boolean {
    return (
      (parsed.split('.')[0]?.length ?? parsed.length) >= 2 && parsed[0] === '0'
    );
  }
}

/**
 * Determines if supplied input is within a given decimal place, defaults to digits of 2
 * @example isWithinDecimalDigits(2,1.11) //true @example isWithinDecimalDigits(2,1.111) //false
 */
function isWithinDecimalDigits(
  input: number | string,
  digits: number = 2
): boolean {
  const decimalVal = input.toString().split('.')[1];

  return decimalVal !== undefined ? decimalVal.length <= digits : true;
}

export { decimalInput, isSafeDecimal, validateDecimal };
export type { SafeDecimal };
