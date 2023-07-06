import { ColumnCount, SelectedCount } from "../Enums.ts";
import { IFormField } from "./IFormField.ts";
import { IOption } from "./IOption.ts";
import { TFnDisabledValue } from "./TFn.ts";

export interface IFormGroupOptions extends IFormField {
  selectedCount: SelectedCount;
  columnCount?: ColumnCount;
  options: IOption[];
  fnDisabledValue?: TFnDisabledValue;
}
