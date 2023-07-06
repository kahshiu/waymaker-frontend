import { useSignal, useComputed } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { globalSerial } from "../../util/globals.ts";
import { IOption } from "./interfaces/IOption.ts";
import { ISelect } from "./interfaces/ISelect.ts";
import { defaultComputedDisabled } from "./Defaults.ts";
import { contextGetField } from "./FormContext.ts";
import { OptionSelect } from "./options/OptionSelect.tsx";

export default function Select(props: ISelect) {
  const { options, fnDisabledValue, fieldName, formContext } = props;

  const fieldContext = contextGetField(formContext, fieldName);
  const { label, data, errorResult } = fieldContext;

  const identifier = useSignal(globalSerial());
  const fieldId = `${fieldName}_${identifier.value}`;

  // NOTE: disabled array of options
  const configDisabled = useComputed(() => {
    const config = new Map();
    if (fnDisabledValue) {
      for (const { value: optionValue } of options) {
        const configItem = fnDisabledValue(
          optionValue,
          fieldContext,
          formContext
        );
        config.set(optionValue, configItem);
      }
    }
    return config;
  });

  const singleChangeHandler = useCallback((e: any) => {
    const targetValue = e.target.value;
    data.value = targetValue;
  }, []);

  return (
    <>
      <label class="field-label"> {label}: </label>
      <div class="field">
        <select
          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
          name={fieldName}
          id={fieldName}
          onChange={singleChangeHandler}
        >
          {options.map((option: IOption) => {
            const { labelName, value: optionValue } = option;
            const isChecked = data.value == optionValue;

            return (
              <OptionSelect
                fieldName={fieldName}
                labelName={labelName}
                value={optionValue}
                isChecked={isChecked}
                disabledResult={
                  configDisabled.value.has(optionValue)
                    ? configDisabled.value.get(optionValue)
                    : defaultComputedDisabled
                }
              />
            );
          })}
        </select>

        {errorResult.value.message.length > 0 && (
          <div class="field-error">{errorResult.value.message}</div>
        )}
      </div>
    </>
  );
}
