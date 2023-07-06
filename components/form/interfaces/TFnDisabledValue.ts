import { IComputedDisabled } from "./IComputedDisabled.ts";
import { IResultField, IFormContext } from "./IFormContext.ts";

export type TFnDisabledValue = (
  value: any,
  fieldContext: IResultField,
  formContext: IFormContext
) => IComputedDisabled;
