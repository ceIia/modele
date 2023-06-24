module.exports = {
  extends: ["next", "turbo", "prettier", "plugin:unicorn/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
    ecmaVersion: 2022,
  },
  env: {
    es2021: true,
  },
  overrides: [
    {
      files: ["*eslintrc*", "**/eslint-config/index.js", "*.config.js"],
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
};
