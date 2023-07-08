import { useSignal } from "@preact/signals";
import { globalSerial } from "../../util/globals.ts";
import { contextGetField } from "./FormContext.ts";
import { IInputText } from "./interfaces/IInputText.ts";

export default function InputHidden(props: IInputText) {
  const { inputType, fieldName, formContext } = props;

  const fieldContext = contextGetField(formContext, fieldName);
  const { data, errorResult, disabledResult } = fieldContext;

  const identifier = useSignal(globalSerial());
  const fieldId = `${fieldName}_${identifier.value}`;

  return (
    <input
      type={inputType ?? "hidden"}
      name={fieldName}
      id={fieldId}
      value={data.value}
      readOnly={true}
    />
  );
}
