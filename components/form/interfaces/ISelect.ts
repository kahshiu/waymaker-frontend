import { IFormField } from "./IFormField.ts";
import { IOption } from "./IOption.ts";
import { TFnDisabledValue } from "./TFn.ts";

export interface ISelect extends IFormField {
  options: IOption[];
  fnDisabledValue?: TFnDisabledValue;
}
