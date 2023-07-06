import { IComputedDisabled } from "./IComputedDisabled.ts";
import { IResultField, IFormContext } from "./IFormContext.ts";

export type TFnValidate = (
  field: IResultField,
  context: IFormContext
) => boolean;

export type TFnDisabledValue = (
  value: any,
  fieldContext: IResultField,
  formContext: IFormContext
) => IComputedDisabled;

export type TFnMasking = (field: IResultField, context: IFormContext) => any;
