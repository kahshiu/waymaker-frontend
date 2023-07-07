import { debounce } from "$std/async/debounce.ts";
import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { globalSerial } from "../../util/globals.ts";
import { IFormField } from "./interfaces/IFormField.ts";
import { contextGetField } from "./FormContext.ts";

interface ITextarea extends IFormField {
  inputDelay?: number;
  rows?: number;
  cols?: number;
  onChange?: (e: any) => void;
}

export default function Textarea(props: ITextarea) {
  const { inputDelay, rows, cols, onChange, fieldName, formContext } = props;

  const fieldContext = contextGetField(formContext, fieldName);
  const { label, data, errorResult, disabledResult } = fieldContext;

  const inputRef = useRef(null);
  const identifier = useSignal(globalSerial());
  const fieldId = `${fieldName}_${identifier.value}`;

  const debounceHandler = debounce((e) => {
    const inputEl = inputRef.current;

    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    data.value = inputEl.value;
    if (onChange) onChange(e);
  }, inputDelay ?? 500);

  const inputHandler = (e: any) => {
    debounceHandler(e);
  };

  return (
    <>
      <label class="field-label" for={fieldId}>
        {label}:
      </label>
      <div class="field">
        <textarea
          class="px-3 py-1 w-full border-solid border-2 border-gray-300 rounded-lg"
          ref={inputRef}
          name={fieldName}
          id={fieldId}
          cols={cols ?? 30}
          rows={rows ?? 10}
          onInput={inputHandler}
          value={data.value}
        ></textarea>
        <div class="field-info">{data.value.length} chars</div>

        {errorResult.value.message.length > 0 && (
          <div class="field-error">{errorResult.value.message}</div>
        )}
      </div>
    </>
  );
}
