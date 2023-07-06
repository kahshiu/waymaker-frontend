import { IComputedDisabled } from "./IComputedDisabled.ts";
import { IOption } from "./IOption.ts";

export interface IOptionSelect extends IOption {
  fieldName: string;
  isChecked: boolean;
  disabledResult?: IComputedDisabled;
}
