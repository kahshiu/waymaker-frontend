import { Signal, ReadonlySignal } from "@preact/signals";
import { IComputedError } from "./IComputedError.ts";
import { IComputedDisabled } from "./IComputedDisabled.ts";

// SECTION: field config
export interface ICondition {
  fnCondition: (field: IResultField, context: IFormContext) => boolean;
  message: string;
}
export interface IConfigField {
  label: string;
  data: any;
  fnMasking?: (field: IResultField, context: IFormContext) => any;
  errorConditions?: ICondition[];
  disabledConditions?: ICondition[];
}

// SECTION: formcontext
export interface IFormContext {
  labels: Map<string, string>;
  data: Map<string, Signal<any>>;
  dataMasks: Map<string, Signal<any>>;
  errorResults: Map<string, ReadonlySignal<IComputedError>>;
  disabledResults: Map<string, ReadonlySignal<IComputedDisabled>>;
}
export interface IResultField {
  label: string;
  data: Signal<any>;
  dataMask: ReadonlySignal<any>;
  errorResult: ReadonlySignal<IComputedError>;
  disabledResult: ReadonlySignal<IComputedDisabled>;
}
