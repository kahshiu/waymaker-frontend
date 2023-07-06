import _ from "lodash";
import { signal, computed, Signal } from "@preact/signals";
import {
  IFormContext,
  IConfigField,
  IResultField,
} from "./interfaces/IFormContext.ts";
import { defaultComputedDisabled, defaultComputedError } from "./Defaults.ts";

export const contextNew = () => {
  return {
    labels: new Map(),
    data: new Map(),
    dataMasks: new Map(),
    errorResults: new Map(),
    disabledResults: new Map(),
  };
};

export const contextAddField = (
  context: IFormContext,
  fieldName: string,
  fieldConfig: IConfigField
) => {
  const fieldLabel = fieldConfig.label;
  const fieldData = signal(fieldConfig.data);

  // SECTION2: disabling operation
  const fieldErrorConditions = fieldConfig.errorConditions ?? [];
  const fieldError = computed(() => {
    let isError = false;
    const fieldContext = contextGetField(context, fieldName);
    for (let i = 0; i < fieldErrorConditions.length; i++) {
      const { fnCondition, message } = fieldErrorConditions[i];
      isError = fnCondition(fieldContext, context);
      if (isError) {
        return { isError, message };
      }
    }
    return defaultComputedError;
  });

  // SECTION2: disabling operation
  const fieldDisabledConditions = fieldConfig.disabledConditions ?? [];
  const fieldDisabled = computed(() => {
    let isDisabled = false;
    const fieldContext = contextGetField(context, fieldName);
    for (let i = 0; i < fieldDisabledConditions.length; i++) {
      const { fnCondition, message } = fieldDisabledConditions[i];
      isDisabled = fnCondition(fieldContext, context);
      if (isDisabled) {
        return { isDisabled, message };
      }
    }
    return defaultComputedDisabled;
  });

  // SECTION3: masking operation
  const fieldDataMask = computed(() => {
    const { isError } = fieldError.value;
    const isBlankMasking = _.isNil(fieldConfig.fnMasking);

    const isPrematureExit = isError || isBlankMasking;
    if (isPrematureExit) return fieldData.value;

    const fieldContext = contextGetField(context, fieldName);
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    return fieldConfig.fnMasking(fieldContext, context);
  });

  // populate context
  context.labels.set(fieldName, fieldLabel);
  context.data.set(fieldName, fieldData);
  context.errorResults.set(fieldName, fieldError);
  context.disabledResults.set(fieldName, fieldDisabled);
  context.dataMasks.set(fieldName, fieldDataMask);

  return context;
};

export const contextGetField = (
  context: IFormContext,
  fieldName: string
): IResultField => {
  const label = context.labels.get(fieldName) as string;
  const data = context.data.get(fieldName) as Signal<any>;
  const dataMask = context.dataMasks.get(fieldName);
  const errorResult = context.errorResults.get(fieldName);
  const disabledResult = context.disabledResults.get(fieldName);

  return {
    label,
    data,
    dataMask: dataMask ?? signal(""),
    errorResult: errorResult ?? computed(() => defaultComputedError),
    disabledResult: disabledResult ?? computed(() => defaultComputedDisabled),
  };
};
