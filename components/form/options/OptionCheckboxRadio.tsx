import { IOptionCheckbox } from "../interfaces/IOptionCheckbox.ts";

export function OptionCheckboxRadio(props: IOptionCheckbox) {
  const { type, fieldName, labelName, value, isChecked, disabledResult } =
    props;

  const fieldId = fieldName + "-" + value;

  return (
    <div>
      <input
        class="scale-125"
        type={type}
        name={fieldName}
        id={fieldId}
        value={value}
        checked={isChecked}
        disabled={disabledResult?.isDisabled ?? false}
      />
      <label class="ml-3" for={fieldId}>
        {labelName}
        {disabledResult?.isDisabled && (
          <div class="text-slate-400"> ({disabledResult?.message}) </div>
        )}
      </label>
    </div>
  );
}
