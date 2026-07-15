import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextVitals from "eslint-config-next/core-web-vitals";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/next-env.d.ts"
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...nextVitals,

  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

    plugins:{
      "unused-imports":unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      "eqeqeq":["error","always"],
      "no-console": ["warn",{allow:["error"]}],
      "no-debugger": "error",
      "prefer-const": "error",
      "unused-imports/no-unused-imports":"error",
      "no-duplicate-imports":"error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  }
);