import type { Linter } from "eslint";

import { mergeConfigs } from "eslint-flat-config-utils";

import js from "./configs/js";
import ts from "./configs/ts";
import vitest from "./configs/vitest";
import { configureGlobals, type GlobalsOptions } from "./globals";

export const configs = {
  js,
  ts,
  vitest,
};

export function defineConfig(params: {
  ignores?: string[];
  globals?: GlobalsOptions;
  configs: (presets: typeof configs) => Linter.Config[];
}): Linter.Config[] {
  const { ignores, globals } = params;

  return [
    ...(ignores ? [{ ignores }] : []),
    ...(globals ? [configureGlobals(globals)] : []),
    mergeConfigs(...params.configs(configs)),
  ] satisfies Linter.Config[];
}
