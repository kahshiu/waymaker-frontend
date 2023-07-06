import { debounce } from "$std/async/debounce.ts";
import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { globalSerial } from "../../util/globals.ts";
import { contextGetField } from "./FormContext.ts";
import { IInputText } from "./interfaces/IInputText.ts";

export interface IInputNumber
  extends Pick<
    IInputText,
    | "inputDelay"
    | "onInput"
    | "onFocus"
    | "onBlur"
    | "onInputDebounce"
    | "formContext"
    | "fieldName"
  > {
  max?: number;
  min?: number;
  step?: number;
}

export default function InputNumber(props: IInputNumber) {
  const {
    inputDelay,
    min,
    max,
    step,
    onInput,
    onFocus,
    onBlur,
    onInputDebounce,
    fieldName,
    formContext,
  } = props;
  const fieldContext = contextGetField(formContext, fieldName);
  const { label, data, errorResult, disabledResult } = fieldContext;

  const identifier = useSignal(globalSerial());
  const fieldId = `${fieldName}_${identifier.value}`;

  const debounceHandler = useCallback(
    debounce((data) => {
      if (onInputDebounce) onInputDebounce(fieldContext, formContext);
    }, inputDelay ?? 500),
    [onInputDebounce]
  );

  const inputHandler = (e: any) => {
    data.value = e.target.value;
    debounceHandler(data);
    if (onInput) onInput(e);
  };
  const focusHandler = (e: any) => {
    if (onFocus) onFocus(e);
  };
  const blurHandler = (e: any) => {
    if (onBlur) onBlur(e);
  };

  return (
    <>
      <label class="field-label" for={fieldId}>
        {" "}
        {label}:{" "}
      </label>
      <div class="field">
        <input
          class={
            errorResult.value.isError ? "field-input-error" : "field-input"
          }
          type={"number"}
          name={fieldName}
          id={fieldId}
          onInput={inputHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          value={data.value}
          min={min ?? 0}
          max={max ?? 100}
          step={step ?? 1}
          disabled={disabledResult.value.isDisabled}
        />

        {errorResult.value.message.length > 0 && (
          <div class="field-error">{errorResult.value.message}</div>
        )}
        {disabledResult.value.message.length > 0 && (
          <div class="field-info">{disabledResult.value.message}</div>
        )}
      </div>
    </>
  );
}
