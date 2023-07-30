import { describe, expect, it } from 'vitest';
import { SafeIntOrFloat, decimalInput } from './decimalInput';

type DecimalInput = typeof decimalInput;
type Params = Parameters<DecimalInput>;
type Return = ReturnType<DecimalInput>;
describe('decimalInput', () => {
  it.each<[Params, Return]>([
    // valid input
    [['', { decimalPlaces: 2 }], { float: 0, value: '', valid: true }],
    [['0.', { decimalPlaces: 2 }], { float: 0, value: '0.', valid: true }],
    [['.', { decimalPlaces: 2 }], { float: 0, value: '0.', valid: true }],
    [['.0', { decimalPlaces: 2 }], { float: 0, value: '0.0', valid: true }],
    [
      ['.01', { decimalPlaces: 2 }],
      { float: 0.01, value: '0.01', valid: true },
    ],
    [
      ['0.01', { decimalPlaces: 2 }],
      { float: 0.01, value: '0.01', valid: true },
    ],
    [
      ['-0.01', { decimalPlaces: 2 }],
      { float: -0.01, value: '-0.01', valid: true },
    ],
    [
      ['1.01', { decimalPlaces: 2 }],
      { float: 1.01, value: '1.01', valid: true },
    ],
    [
      ['11111.01', { decimalPlaces: 2 }],
      { float: 11111.01, value: '11111.01', valid: true },
    ],
    [
      [' ', { decimalPlaces: 2, min: 0, max: 1 }],
      { float: 0, value: '', valid: true },
    ],
    [
      [' 1', { decimalPlaces: 2, min: 0 }],
      { float: 1, value: '1', valid: true },
    ],
    [
      [' 1.1', { decimalPlaces: 2, max: 2 }],
      { float: 1.1, value: '1.1', valid: true },
    ],
    // invalid input
    [
      ['1.01', { decimalPlaces: 1 }],
      { float: undefined, value: undefined, valid: false },
    ],
    [
      ['1.011', { decimalPlaces: 2 }],
      { float: undefined, value: undefined, valid: false },
    ],
    [
      ['1.0111', { decimalPlaces: 3 }],
      { float: undefined, value: undefined, valid: false },
    ],
    [
      ['$1', { decimalPlaces: 2 }],
      { float: undefined, value: undefined, valid: false },
    ],
    [
      ['1.1.1', { decimalPlaces: 2 }],
      { float: undefined, value: undefined, valid: false },
    ],
    // min/max options
    [
      ['-1', { decimalPlaces: 2, min: 0 }],
      { float: undefined, value: undefined, valid: false },
    ],
    [
      ['-1', { decimalPlaces: 2, min: 10 }],
      { float: undefined, value: undefined, valid: false },
    ],
    [
      ['11', { decimalPlaces: 2, max: 10 }],
      { float: undefined, value: undefined, valid: false },
    ],
  ])('\nInput: %s\nExpected:%s', (args, expected) => {
    expect(decimalInput(...args)).toStrictEqual(expected);
  });
});

// accepted generic return arguments
decimalInput<SafeIntOrFloat>('1').float;
decimalInput<number>('1').float;

// @ts-expect-error - it does not accept string generic return argument
decimalInput<string>('1').float;
// @ts-expect-error - it does not accept boolean generic return argument
decimalInput<boolean>('1').float;
