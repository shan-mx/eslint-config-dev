import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vitest from "@vitest/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";

import type { TypedFlatConfigItem } from "./types";

const config: TypedFlatConfigItem[] = [
  {
    ignores: ["**/dist", "**/coverage"],
  },
  {
    plugins: {
      "@stylistic": stylistic,
      "unused-imports": unusedImports,
      unicorn,
      perfectionist,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...unicorn.configs["flat/recommended"].rules,
      eqeqeq: "error",
      "max-params": ["error", 3],
      "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 1 }],
      "no-nested-ternary": "error",
      "prefer-arrow-callback": "warn",
      "no-unneeded-ternary": "warn",
      "one-var-declaration-per-line": ["warn", "always"],
      "operator-assignment": ["warn", "always"],
      "prefer-destructuring": [
        "warn",
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "perfectionist/sort-imports": [
        "warn",
        {
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
        },
      ],
      "perfectionist/sort-named-imports": "warn",
      "perfectionist/sort-array-includes": "warn",
      "perfectionist/sort-enums": "warn",
      "@stylistic/padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: ["multiline-const", "function", "class"],
          next: "*",
        },
        { blankLine: "always", prev: ["interface", "type"], next: "*" },
        { blankLine: "always", prev: "*", next: ["export", "return"] },
      ],
      "unused-imports/no-unused-imports": "warn",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/consistent-function-scoping": [
        "warn",
        {
          checkArrowFunctions: false,
        },
      ],
      "unicorn/prefer-code-point": "off",
      "unicorn/no-process-exit": "off",
      "unicorn/prefer-ternary": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs["stylistic-type-checked"].rules,
      ...tsPlugin.configs["recommended-type-checked"].rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          trailingUnderscore: "forbid",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
    },
  },
  {
    files: ["**/test/*.ts", "**/test/*.tsx"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/valid-describe-callback": "off",
      "vitest/no-identical-title": "off",
      "vitest/valid-title": "off",
      "vitest/expect-expect": "off",
      "vitest/valid-expect": "off",
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
];

export default config;
