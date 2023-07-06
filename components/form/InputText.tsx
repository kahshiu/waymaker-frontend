import { debounce } from "$std/async/debounce.ts";
import { useSignal } from "@preact/signals";
import { useCallback, useRef } from "preact/hooks";
import { globalSerial } from "../../util/globals.ts";
import { contextGetField } from "./FormContext.ts";
import { IInputText } from "./interfaces/IInputText.ts";

export default function InputText(props: IInputText) {
  const {
    inputType,
    inputDelay,
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

  const inputRef = useRef<any>(null);
  const isFocused = useSignal(false);
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
    isFocused.value = true;
    if (onFocus) onFocus(e);
  };
  const blurHandler = (e: any) => {
    isFocused.value = false;
    if (onBlur) onBlur(e);
  };

  return (
    <>
      <label class="field-label" for={fieldId}>
        {label}:
      </label>
      <div class="field">
        <input
          class={
            errorResult.value.isError ? "field-input-error" : "field-input"
          }
          ref={inputRef}
          type={inputType ?? "text"}
          name={fieldName}
          id={fieldId}
          onInput={inputHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          value={isFocused.value ? data.value : dataMask.value}
          disabled={disabledResult.value.isDisabled}
          placeholder={description ?? ""}
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

/**
 * NOTE: base component for
 * 1. input text
 * 2. input password
 * 3. input email
 * 4. input number
 *
 *
 * 5. input range
 * 6. input url
 * 7. input week/ month/ date/ time
 * 8. input file
 *
 * 9. select
 * 10. textarea
 * 11. checkbox
 * 12. radio
 * 13. submit
 *
 * TODO:
 * 1. rethink organisation of interfaces for input text/ number
 * 2. async selector and filter
 * 3. ways to link up async database retrievals
 * */
