import { ICondition } from "../interfaces/IFormContext.ts";
import { IParamsCheckLength } from "../interfaces/IParamsCheckLength.ts";
import {
  hasNonNumeric,
  not,
  hasPhonePrefix,
  isLengthLessThan,
  isLengthMoreThan,
  isLengthExactly,
} from "./validators.ts";

export const errorWhenNonNumeric: ICondition = {
  fnCondition: hasNonNumeric,
  message: "Please enter numeric charaters only",
};

export const errorWhenWrongPhonePrefix: ICondition = {
  fnCondition: not(hasPhonePrefix),
  message: "Invalid Malaysia phone prefix",
};

export type TFnErrorLength = (params: IParamsCheckLength) => ICondition;

export const errorWhenLengthLessThan: TFnErrorLength = (
  params: IParamsCheckLength
) => {
  return {
    fnCondition: not(isLengthLessThan(params)),
    message: `Length should be less than ${params.length}`,
  };
};

export const errorWhenLengthMoreThan: TFnErrorLength = (
  params: IParamsCheckLength
) => {
  return {
    fnCondition: not(isLengthMoreThan(params)),
    message: `Length should be more than ${params.length}`,
  };
};

export const errorWhenLengthNotMatch: TFnErrorLength = (
  params: IParamsCheckLength
) => {
  return {
    fnCondition: not(isLengthExactly(params)),
    message: `Length should be exactly ${params.length}`,
  };
};
