import { IFormContext } from "../../form/interfaces/IFormContext.ts";

export interface IBlockForm<TSource> {
  formContext: IFormContext;
  payload: TSource;
}
