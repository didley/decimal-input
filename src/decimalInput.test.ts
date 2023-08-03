import { describe, expect, it } from 'vitest';
import { SafeDecimal, decimalInput, validateDecimal } from './decimalInput';

const INVALID = { number: undefined, value: undefined, valid: false } as const;

type DecimalInput = typeof decimalInput;
type Params = Parameters<DecimalInput>;
type Return = ReturnType<DecimalInput>;

describe('decimalInput', () => {
  describe('decimalInput()', () => {
    it.each<[Params, Return]>([
      // valid input
      [['', { digits: 2 }], { number: 0, value: '', valid: true }],
      [['0', { digits: 2 }], { number: 0, value: '0', valid: true }],
      [['0.', { digits: 2 }], { number: 0, value: '0.', valid: true }],
      [['.', { digits: 2 }], { number: 0, value: '0.', valid: true }],
      [['.0', { digits: 2 }], { number: 0, value: '0.0', valid: true }],
      [['.01', { digits: 2 }], { number: 0.01, value: '0.01', valid: true }],
      [['0.01', { digits: 2 }], { number: 0.01, value: '0.01', valid: true }],
      [
        ['-0.01', { digits: 2 }],
        { number: -0.01, value: '-0.01', valid: true },
      ],
      [['1.01', { digits: 2 }], { number: 1.01, value: '1.01', valid: true }],
      [
        ['11111.01', { digits: 2 }],
        { number: 11111.01, value: '11111.01', valid: true },
      ],
      [
        [' ', { digits: 2, min: 0, max: 1 }],
        { number: 0, value: '', valid: true },
      ],
      [[' 1', { digits: 2, min: 0 }], { number: 1, value: '1', valid: true }],
      [
        [' 1.1', { digits: 2, max: 2 }],
        { number: 1.1, value: '1.1', valid: true },
      ],
      [['00.'], { number: 0, value: '0.', valid: true }],
      // invalid input
      [['1.01', { digits: 1 }], INVALID],
      [['1.011', { digits: 2 }], INVALID],
      [['1.0111', { digits: 3 }], INVALID],
      [['$1', { digits: 2 }], INVALID],
      [['1.1.1', { digits: 2 }], INVALID],
      // min/max options
      [['-1', { digits: 2, min: 0 }], INVALID],
      [['-1', { digits: 2, min: 10 }], INVALID],
      [['11', { digits: 2, max: 10 }], INVALID],
      // it defaults to digits of 2
      [['1.011'], INVALID],
    ])('\nInput: %s\nExpected:%s', (args, expected) => {
      expect(decimalInput(...args)).toStrictEqual(expected);
    });
  });
  describe('validateFloat()', () => {
    it.each<[Params, boolean]>([
      // @ts-expect-error - it returns false on boolean input type
      [[true], false],
      // it defaults to digits of 2
      [['1.011'], false],
    ])('\nInput: %s\nExpected:%s', (args, expected) => {
      expect(validateDecimal(...args)).toBe(expected);
    });
  });
});

// accepted generic return arguments
decimalInput<SafeDecimal>('1').number;
decimalInput<number>('1').number;

// @ts-expect-error - it does not accept string generic return argument
decimalInput<string>('1').number;
// @ts-expect-error - it does not accept boolean generic return argument
decimalInput<boolean>('1').number;
