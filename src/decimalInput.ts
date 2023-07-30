/** @see https://egghead.io/blog/using-branded-types-in-typescript */
type SafeIntOrFloat = number & { __type: 'SafeIntOrFloat' };

type ReturnType<Float extends SafeIntOrFloat | number> =
  | {
      float: Float;
      value: string;
      valid: true;
    }
  | {
      float: undefined;
      value: undefined;
      valid: false;
    };

type Options = { min?: number; max?: number; decimalPlaces?: number };

function decimalInput<Float extends SafeIntOrFloat | number = SafeIntOrFloat>(
  input: string,
  opts: Options = {}
): ReturnType<Float> {
  const value = parseInput(input);
  const float = Number(value);

  const valid =
    validateInput(value, opts.decimalPlaces) && validateFloat(float, opts);

  return valid
    ? { float: float as Float, value, valid }
    : { float: undefined, value: undefined, valid: false };
}

function validateFloat<Return extends SafeIntOrFloat | number = SafeIntOrFloat>(
  input: unknown,
  opts: Options = {}
): input is Return {
  if (typeof input !== 'number') {
    return false;
  }

  const withinMin = opts.min === undefined ? true : input >= opts.min;
  const withinMax = opts.max === undefined ? true : input <= opts.max;
  const withinDecimalPlace =
    opts.decimalPlaces === undefined
      ? true
      : isWithinDecimalPlaces(input, opts.decimalPlaces);

  return (
    withinMin && withinMax && withinDecimalPlace && isSafeIntOrFloat(input)
  );
}

function validateInput(input: string, decimalPlaces?: number): boolean {
  const asNum = Number(input);

  return (
    input.trim() === '.' ||
    (isSafeIntOrFloat(asNum) &&
      input.trim() !== '00' &&
      input.trim().split('.')[1] !== '00' &&
      isWithinDecimalPlaces(input, decimalPlaces))
  );
}

function parseInput(input: string): string {
  let parsed = input.trim();

  const startsWithDecimalPoint = parsed[0] === '.';

  if (parsed !== '0.') {
    if (startsWithDecimalPoint) {
      parsed = '0' + parsed;
    } else if (hasLeadingZeros()) {
      while (hasLeadingZeros()) {
        parsed = parsed.substring(1);
      }
    }
  }

  return parsed;

  function hasLeadingZeros(): boolean {
    return (
      (parsed.split('.')[0]?.length ?? parsed.length) >= 2 && parsed[0] === '0'
    );
  }
}

function isSafeIntOrFloat(input: number): input is SafeIntOrFloat {
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

export type { SafeIntOrFloat };
const DecimalUtil = { isSafeIntOrFloat, validateFloat };
export { DecimalUtil, decimalInput };
