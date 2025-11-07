// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", ".env*", "*.config.js"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),

  {
    files: ["**/*.{ts,tsx,jsx,js}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      quotes: ["error", "single", { avoidEscape: true }],
      "object-shorthand": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"],
      "quote-props": ["warn", "consistent-as-needed"],
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          ignoreCase: true,
          allowSeparatedGroups: true,
        },
      ],
      "max-len": [
        "warn",
        { code: 100, ignoreRegExpLiterals: true, ignoreStrings: true },
      ],
      "no-console": [
        "warn",
        { allow: ["warn", "error", "info", "debug", "trace"] },
      ],
    },
  }
);
