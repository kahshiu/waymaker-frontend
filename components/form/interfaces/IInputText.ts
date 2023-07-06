import { IResultField, IFormContext } from "./IFormContext.ts";
import { IFormField } from "./IFormField.ts";

export interface IInputText extends IFormField {
  inputType?: "text" | "password";
  inputDelay?: number;
  onInput?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onInputDebounce?: (
    fieldContext: IResultField,
    formContext: IFormContext
  ) => void;
}
