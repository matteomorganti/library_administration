module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "babel-eslint",
 extends: [
    "plugin:react/recommended"
 ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  
  plugins: ["react"],
  rules: {
    "no-unused-vars": "off",
    "react/prop-types": [
      "enabled",
      { "ignore": "ignore", "customValidators": "customValidator" }
    ],
    "react/no-deprecated": "off"
  },
};
