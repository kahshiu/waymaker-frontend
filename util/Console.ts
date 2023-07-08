import { ConsoleTags, ConsoleModes, Environments } from "./globalEnums.ts";
import { consoleMode, consoleTags, environment } from "./globals.ts";
import * as _ from "lodash";

export const consoleDebug = (
  title: string,
  message: any,
  tags: ConsoleTags[]
) => {
  const isDev = environment === Environments.DEVELOPEMNT;
  const isLoggingAll = consoleMode === ConsoleModes.ALL;
  const isLoggingTag =
    consoleMode === ConsoleModes.TAGS && _.intersection(tags, consoleTags);
  const isLogging = isDev && (isLoggingAll || isLoggingTag);
  if (isLogging) console.debug(title, message);
};
