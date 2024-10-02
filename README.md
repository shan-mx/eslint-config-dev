# ESLint Config

## Installation

```bash
pnpm dlx jsr add @mxdev/eslint-config
```

## Usage

```javascript
import { defineConfig } from "@mxdev/eslint-config";

export default defineConfig({
  ignores: ["**/dist", "**/coverage"],
  globals: {
    presets: ["builtin", "es2022"],
    custom: {
      NodeJS: true,
    },
  },
  configs: (p) => [p.js, p.ts, p.vitest],
});
```
