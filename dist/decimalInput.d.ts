/** @see https://egghead.io/blog/using-branded-types-in-typescript */
type SafeIntOrFloat = number & {
    __type: 'SafeIntOrFloat';
};
type ReturnType<Float extends SafeIntOrFloat | number> = {
    float: Float;
    value: string;
    valid: true;
} | {
    float: undefined;
    value: undefined;
    valid: false;
};
type Options = {
    min?: number;
    max?: number;
    decimalPlaces?: number;
};
declare function decimalInput<Float extends SafeIntOrFloat | number = SafeIntOrFloat>(input: string, opts?: Options): ReturnType<Float>;
declare function validateFloat<Return extends SafeIntOrFloat | number = SafeIntOrFloat>(input: unknown, opts?: Options): input is Return;
declare function isSafeIntOrFloat(input: number): input is SafeIntOrFloat;
export type { SafeIntOrFloat };
declare const DecimalUtil: {
    isSafeIntOrFloat: typeof isSafeIntOrFloat;
    validateFloat: typeof validateFloat;
};
export { DecimalUtil, decimalInput };
