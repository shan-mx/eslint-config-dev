import type { Linter } from "eslint";

import type { TypedFlatConfigItem } from "./types";

import config from "./config";
import { configureGlobals, type GlobalsOptions } from "./globals";

export function defineConfig(params: {
  ignores?: string[];
  globals?: GlobalsOptions;
  additional?: TypedFlatConfigItem[];
}): Linter.Config {
  const { ignores, globals, additional } = params;

  return [
    ...(ignores ? [{ ignores }] : []),
    ...(globals ? [configureGlobals(globals)] : []),
    ...config,
    ...(additional ?? []),
  ] satisfies TypedFlatConfigItem[] as Linter.Config;
}
