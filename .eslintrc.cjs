module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["react", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Add any additional rules or overrides here
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "error", // Enforce error for console.log and related statements
    "import/order": [
      "error",
      {
        groups: [
          ["external", "builtin"],
          "internal",
          ["sibling", "parent"],
          "index",
        ],
        pathGroups: [
          {
            pattern: "@(react|react-native)",
            group: "external",
            position: "before",
          },
          {
            pattern: "src/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal", "react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },

        // groups: [
        //   ["builtin", "external"],
        //   "internal",
        //   ["parent", "sibling", "index"],
        // ],
        // "newlines-between": "always",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {},
      typescript: {},
    },
  },
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    },
  ],
};
