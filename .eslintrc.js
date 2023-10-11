module.exports = {
    parser: "babel-eslint",
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    plugins: ["react", "prettier"],
    rules: {
      "prettier/prettier": "error",
      "react/prop-types": 0,
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  };
  