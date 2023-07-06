import { IOptionSelect } from "../interfaces/IOptionSelect.ts";

export function OptionSelect(props: IOptionSelect) {
  const { fieldName, labelName, value, isChecked, disabledResult } = props;

  const fieldId = fieldName + "-" + value;

  return (
    <option
      id={fieldId}
      value={value}
      selected={isChecked}
      disabled={disabledResult?.isDisabled ?? false}
    >
      {labelName}
      {disabledResult?.isDisabled && <span>({disabledResult?.message})</span>}
    </option>
  );
}
