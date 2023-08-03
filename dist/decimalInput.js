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
function decimalInput(
/** Your inputs value */
value, opts = {}) {
    const parsedValue = parseInput(value);
    const float = Number(parsedValue);
    const valid = validateInput(parsedValue, opts.decimalPlaces) &&
        validateFloat(float, opts);
    return valid
        ? { float: float, value: parsedValue, valid }
        : { float: undefined, value: undefined, valid: false };
}
function validateFloat(input, opts = {}) {
    if (typeof input !== 'number') {
        return false;
    }
    const withinMin = opts.min === undefined ? true : input >= opts.min;
    const withinMax = opts.max === undefined ? true : input <= opts.max;
    const withinDecimalPlace = opts.decimalPlaces === undefined
        ? true
        : isWithinDecimalPlaces(input, opts.decimalPlaces);
    return (withinMin && withinMax && withinDecimalPlace && isSafeIntOrFloat(input));
}
function validateInput(input, decimalPlaces) {
    const asNum = Number(input);
    return (input.trim() === '.' ||
        (isSafeIntOrFloat(asNum) &&
            input.trim() !== '00' &&
            input.trim().split('.')[1] !== '00' &&
            isWithinDecimalPlaces(input, decimalPlaces)));
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
function isSafeIntOrFloat(input) {
    return (isFloat(input) || Number.isInteger(input)) && Number.isFinite(input);
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
}
/** @example withinDecimalPlace(2,1.11) //true @example withinDecimalPlace(2,1.111) //false  */
function isWithinDecimalPlaces(input, places) {
    const decimalVal = input.toString().split('.')[1];
    return decimalVal !== undefined && places !== undefined
        ? decimalVal.length <= places
        : true;
}
const DecimalUtil = { isSafeIntOrFloat, validateFloat };
export { DecimalUtil, decimalInput };
