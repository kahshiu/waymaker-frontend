import { useSignal } from "@preact/signals";
import { globalSerial } from "../../util/globals.ts";
import { contextGetField } from "./FormContext.ts";
import { IInputText } from "./interfaces/IInputText.ts";

export default function InputHidden(props: IInputText) {
  const {
    inputType,
    inputDelay,
    inputReadOnly,
    onInput,
    onFocus,
    onBlur,
    onInputDebounce,
    fieldName,
    formContext,
  } = props;

  const fieldContext = contextGetField(formContext, fieldName);
  const { label, data, description, dataMask, errorResult, disabledResult } =
    fieldContext;

  const identifier = useSignal(globalSerial());
  const fieldId = `${fieldName}_${identifier.value}`;

  return (
    <input
      type={inputType ?? "text"}
      name={fieldName}
      id={fieldId}
      value={data.value}
      readOnly={true}
    />
  );
}
