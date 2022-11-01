module.exports = {
  root: true,
  env: {
    browser: true,
    // es2021: true,
    // node: true,
  },
  extends: [
    // "plugin:vue/recommended",
    "eslint:recommended",
    // "./eslintrcDir/.eslintrc1.js",
    // "./eslintrcDir/.eslintrc2.js",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "2015",
  },
  rules: {
    "no-var": 2,
  },
//   plugins: ["./plugins/eslint-config-pipu"],
};
