module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true
  },
  rules: {
    "no-console": ["error", { allow: ["log"] }],
    "no-unused-vars":  ["error", { args: "none" }]
  }
};
