import type { Linter } from "eslint";

import globals from "globals";

export function configureGlobals({
  presets = [],
  additional = {},
}: {
  presets?: (keyof typeof globals)[];
  additional?: Linter.Globals;
}): Linter.Config {
  let appliedPresets: Linter.Globals = {};

  for (const each of presets) {
    appliedPresets = {
      ...appliedPresets,
      ...globals[each],
    };
  }

  return {
    languageOptions: {
      globals: {
        ...appliedPresets,
        ...additional,
      },
    },
  };
}
