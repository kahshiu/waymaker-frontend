import { useCallback } from "preact/hooks";
import { useComputed } from "@preact/signals";
import { contextGetField } from "./FormContext.ts";
import { defaultComputedDisabled } from "./Defaults.ts";
import { ColumnCount, SelectedCount } from "./Enums.ts";
import { IFormGroupOptions } from "./interfaces/IFormGroupOptions.ts";
import { IOption } from "./interfaces/IOption.ts";
import { OptionCheckboxRadio } from "./options/OptionCheckboxRadio.tsx";

export default function GroupedOptions(props: IFormGroupOptions) {
  const {
    selectedCount,
    columnCount,
    options,
    fnDisabledValue,
    fieldName,
    formContext,
  } = props;

  const itemClassName = `px-3 py-1 ${columnCount ?? ColumnCount.TWO}`;
  const fieldContext = contextGetField(formContext, fieldName);
  const { label, data, errorResult } = fieldContext;

  // NOTE: data string primtive to string array
  const dataArr = useComputed(() => {
    return data.value.split(",").filter((v: any) => v.length > 0);
  });

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

  // NOTE: invalid for whole control

  const multiChangeHandler = useCallback((e: any) => {
    const targetValue = e.target.value;
    let newValue = [...dataArr.value, targetValue];
    if (dataArr.value.includes(targetValue)) {
      newValue = dataArr.value.filter((v: any) => v !== targetValue);
    }
    data.value = newValue.join(",");
  }, []);

  const singleChangeHandler = useCallback((e: any) => {
    const targetValue = e.target.value;
    data.value = targetValue;
  }, []);

  return (
    <>
      <label class="field-label"> {label}: </label>
      <div class="field">
        <div
          class="flex flex-wrap w-full max-h-72 border-2 border-slate-300 border-solid rounded-lg overflow-auto"
          onChange={
            selectedCount === SelectedCount.SINGLE
              ? singleChangeHandler
              : multiChangeHandler
          }
        >
          {options.map((option: IOption) => {
            const { labelName, value: optionValue } = option;
            const type =
              selectedCount === SelectedCount.SINGLE ? "radio" : "checkbox";

            return (
              <div class={itemClassName}>
                <OptionCheckboxRadio
                  type={type}
                  fieldName={fieldName}
                  labelName={labelName}
                  value={optionValue}
                  isChecked={dataArr.value.includes(optionValue)}
                  disabledResult={
                    configDisabled.value.has(optionValue)
                      ? configDisabled.value.get(optionValue)
                      : defaultComputedDisabled
                  }
                />
              </div>
            );
          })}
        </div>

        {errorResult.value.message.length > 0 && (
          <div class="field-error">{errorResult.value.message}</div>
        )}
      </div>
    </>
  );
}
