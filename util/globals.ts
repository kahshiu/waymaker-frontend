import _ from "lodash";
import { ConsoleModes, ConsoleTags, Environments } from "./globalEnums.ts";
import { generateSerial } from "./numbers.ts";
export const globalSerial = generateSerial(0);

// SECTION: url related
// export const backendApi = "http://localhost:8020/api";
export const backendApi = "http://backend-api:8000/api";
export const frontendWeb = "http://localhost:8030";

export const backendUrl = (path: string, searchParams?: URLSearchParams) => {
  const url = `${backendApi}/${path}`;
  const queryString = _.isNil(searchParams)
    ? ""
    : `?${searchParams?.toString()}`;
  return `${url}${queryString}`;
};

export const webUrl = (path: string, searchParams?: URLSearchParams) => {
  const url = `${frontendWeb}/${path}`;
  const queryString = _.isNil(searchParams)
    ? ""
    : `?${searchParams?.toString()}`;
  return `${url}${queryString}`;
};

export const environment: Environments = Environments.DEVELOPEMNT;
export const consoleMode: ConsoleModes = ConsoleModes.ALL;
export const consoleTags: ConsoleTags[] = [];
