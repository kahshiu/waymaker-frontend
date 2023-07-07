import {
  errorWhenLengthMoreThan,
  errorWhenLengthLessThan,
  errorWhenNonNumeric,
  errorWhenLengthNotMatch,
  errorWhenWrongPhonePrefix,
} from "./errorsBasic.ts";

export const errorName = [
  errorWhenLengthLessThan({ length: 5 }),
  errorWhenLengthMoreThan({ length: 100 }),
];

export const errorIC = [
  errorWhenNonNumeric,
  errorWhenLengthNotMatch({ length: 12 }),
];

export const errorPhoneNo = [errorWhenNonNumeric, errorWhenWrongPhonePrefix];

export const errorPostcode = [
  errorWhenNonNumeric,
  errorWhenLengthMoreThan({ length: 5 }),
];
