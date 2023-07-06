import {
  errorWhenLengthMoreThan,
  errorWhenLengthLessThan,
  errorWhenNonNumeric,
  errorWhenLengthNotMatch,
  errorWhenWrongPhonePrefix,
} from "./errorsBasic.ts";

export const errorName = [
  errorWhenLengthMoreThan({ length: 5 }),
  errorWhenLengthLessThan({ length: 100 }),
];

export const errorIC = [
  errorWhenNonNumeric,
  errorWhenLengthNotMatch({ length: 12 }),
];

export const errorPhoneNo = [errorWhenNonNumeric, errorWhenWrongPhonePrefix];

export const errorPostcode = [errorWhenNonNumeric, errorWhenWrongPhonePrefix];
