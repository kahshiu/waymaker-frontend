import { ICondition } from "../interfaces/IFormContext.ts";
import { IParamsCheckLength } from "../interfaces/IParamsCheckLength.ts";
import { TFnValidate } from "../interfaces/TFn.ts";

export type TFnValidateLength = (params: IParamsCheckLength) => TFnValidate;
export type TModFnValidate = (fnValidate: TFnValidate) => TFnValidate;
export type TModFnValidate2 = (fnValidate: TFnValidate) => TModFnValidate;

export const hasNonNumeric: TFnValidate = (field) => {
  const value = field.data.value;
  return /[^0-9]/.test(value);
};

export const hasPhonePrefix: TFnValidate = (field) => {
  const prefix2 = ["03", "04", "05", "06", "07", "09"];
  const prefix3 = [
    "010",
    "011",
    "012",
    "013",
    "014",
    "015",
    "016",
    "017",
    "018",
    "019",
    "082",
    "083",
    "084",
    "085",
    "086",
    "087",
    "088",
    "089",
  ];
  const value = field.data.value;
  return (
    prefix2.includes(value.slice(0, 2)) || prefix3.includes(value.slice(0, 3))
  );
};

export const isMandatory: TFnValidate = (field) => {
  const _value = field.data.value;
  return _value.length > 0;
};

export const isLengthExactly: TFnValidateLength = (params) => (field) => {
  const _value = field.data.value;
  return _value.length == params.length;
};

export const isLengthLessThan: TFnValidateLength = (params) => (field) => {
  const _inclusive = params?.inclusive ?? false;
  const _value = field.data.value;

  if (_inclusive) {
    return _value.length <= params.length;
  } else {
    return _value.length < params.length;
  }
};

export const isLengthMoreThan: TFnValidateLength = (params) => (field) => {
  const _inclusive = params?.inclusive ?? false;
  const _value = field.data.value;
  if (!_value) return false;

  if (_inclusive) {
    return _value.length >= params.length;
  } else {
    return _value.length > params.length;
  }
};

export const isEmail: TFnValidate = (field) => {
  return true;
};

/**
 * SECTION: modifiers, helpers
 */
export const not: TModFnValidate = (fnValidate) => {
  return (field, formContext) => !fnValidate(field, formContext);
};

export const and: TModFnValidate2 = (fnValidate1) => {
  return (fnValidate2) => {
    return (field, formContext) => {
      return fnValidate1(field, formContext) && fnValidate2(field, formContext);
    };
  };
};

export const withPrecondition = (precondition: TFnValidate) => {
  return (condition: ICondition) => {
    const { fnCondition: validator, message } = condition;
    const fnConditionModified = and(precondition)(validator);
    return {
      fnCondition: fnConditionModified,
      message,
    };
  };
};

export const withEndCondition = (endCondition: TFnValidate) => {
  return (condition: ICondition) => {
    const { fnCondition: validator, message } = condition;
    const fnConditionModified = and(validator)(endCondition);
    return {
      fnCondition: fnConditionModified,
      message,
    };
  };
};
