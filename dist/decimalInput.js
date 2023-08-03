/**
 * `isSafeDecimal` is a type guard to determine if a value is of type `SafeDecimal`, a `SafeDecimal` is an integer or float excluding `NaN` & `Infinity`.
 */
function isSafeDecimal(input, digits) {
    const withinDigits = digits !== undefined ? isWithinDecimalDigits(input, digits) : true;
    return ((isFloat(input) || Number.isInteger(input)) &&
        Number.isFinite(input) &&
        withinDigits);
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
}
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
function decimalInput(
/** Your inputs value */
value, options = {}) {
    const parsedValue = parseInput(value);
    const number = Number(parsedValue);
    const valid = validateInput(parsedValue, options.digits) &&
        validateDecimal(number, options);
    return valid
        ? { number: number, value: parsedValue, valid }
        : { number: undefined, value: undefined, valid: false };
}
function validateDecimal(input, opts = {}) {
    if (typeof input !== 'number') {
        return false;
    }
    const withinMin = opts.min === undefined ? true : input >= opts.min;
    const withinMax = opts.max === undefined ? true : input <= opts.max;
    const withinDecimalPlace = opts.digits === undefined
        ? true
        : isWithinDecimalDigits(input, opts.digits);
    return withinMin && withinMax && withinDecimalPlace && isSafeDecimal(input);
}
function validateInput(input, decimalPlaces) {
    const asNum = Number(input);
    return (input.trim() === '.' ||
        (isSafeDecimal(asNum) &&
            input.trim() !== '00' &&
            input.trim().split('.')[1] !== '00' &&
            isWithinDecimalDigits(input, decimalPlaces)));
}
function parseInput(input) {
    let parsed = input.trim();
    const startsWithDecimalPoint = parsed[0] === '.';
    if (startsWithDecimalPoint && parsed !== '0.') {
        parsed = '0' + parsed;
    }
    else if (hasLeadingZeros()) {
        while (hasLeadingZeros()) {
            parsed = parsed.substring(1);
        }
    }
    return parsed;
    function hasLeadingZeros() {
        var _a, _b;
        return (((_b = (_a = parsed.split('.')[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : parsed.length) >= 2 && parsed[0] === '0');
    }
}
/**
 * Determines if supplied input is within a given decimal place, defaults to digits of 2
 * @example isWithinDecimalDigits(2,1.11) //true @example isWithinDecimalDigits(2,1.111) //false
 */
function isWithinDecimalDigits(input, digits = 2) {
    const decimalVal = input.toString().split('.')[1];
    return decimalVal !== undefined ? decimalVal.length <= digits : true;
}
export { decimalInput, isSafeDecimal, validateDecimal };
