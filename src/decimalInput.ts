/**
 * A branded type to allow strong typing of a decimal(int or float) `number` value.
 *
 * You can use `isSafeDecimal` to determine if a value or assert with `as SafeDecimal` if you're sure.
 *
 * @see {@link https://egghead.io/blog/using-branded-types-in-typescript | Branded types explication}
 */
type SafeDecimal = number & { __type: 'SafeDecimal' };

type DecimalInputReturnType<F extends SafeDecimal | number> =
  | {
      float: F;
      value: string;
      valid: true;
    }
  | {
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
function decimalInput<F extends SafeDecimal | number = SafeDecimal>(
  /** Your inputs value */
  value: string,
  opts: Options = {}
): DecimalInputReturnType<F> {
  const parsedValue = parseInput(value);
  const float = Number(parsedValue);

  const valid =
    validateInput(parsedValue, opts.decimalPlaces) &&
    validateFloat(float, opts);

  return valid
    ? { float: float as F, value: parsedValue, valid }
    : { float: undefined, value: undefined, valid: false };
}

function validateFloat<R extends SafeDecimal | number = SafeDecimal>(
  input: unknown,
  opts: Options = {}
): input is R {
  if (typeof input !== 'number') {
    return false;
  }

  const withinMin = opts.min === undefined ? true : input >= opts.min;
  const withinMax = opts.max === undefined ? true : input <= opts.max;
  const withinDecimalPlace =
    opts.decimalPlaces === undefined
      ? true
      : isWithinDecimalPlaces(input, opts.decimalPlaces);

  return withinMin && withinMax && withinDecimalPlace && isSafeDecimal(input);
}

function validateInput(input: string, decimalPlaces?: number): boolean {
  const asNum = Number(input);

  return (
    input.trim() === '.' ||
    (isSafeDecimal(asNum) &&
      input.trim() !== '00' &&
      input.trim().split('.')[1] !== '00' &&
      isWithinDecimalPlaces(input, decimalPlaces))
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

function isSafeDecimal(input: number): input is SafeDecimal {
  return (isFloat(input) || Number.isInteger(input)) && Number.isFinite(input);

  function isFloat(n: number): boolean {
    return Number(n) === n && n % 1 !== 0;
  }
}

/** @example withinDecimalPlace(2,1.11) //true @example withinDecimalPlace(2,1.111) //false  */
function isWithinDecimalPlaces(
  input: number | string,
  places?: number
): boolean {
  const decimalVal = input.toString().split('.')[1];

  return decimalVal !== undefined && places !== undefined
    ? decimalVal.length <= places
    : true;
}

export { decimalInput, isSafeDecimal, validateFloat };
export type { SafeDecimal };
