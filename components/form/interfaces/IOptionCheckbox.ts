import { IComputedDisabled } from "./IComputedDisabled.ts";
import { IOption } from "./IOption.ts";

export interface IOptionCheckbox extends IOption {
  type: string;
  fieldName: string;
  isChecked: boolean;
  disabledResult?: IComputedDisabled;
}
