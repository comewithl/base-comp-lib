module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['standard', 'standard-react'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'xss'],
  rules: {
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/no-unused-prop-types': [0],
    'object-curly-spacing': 'never',
    'space-before-function-paren': ["warn", "always"],
    camelcase: 0,
    eqeqeq: 0,
    'max-len': ['error', 120],
    'object-curly-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    indent: ['error', 2, { "SwitchCase": 1 }],
    quotes: ['error', 'single'],
    'eol-last': 0,
    'comma-dangle': 0,
    'object-curly-spacing': 0,
    'no-irregular-whitespace': ["error", { "skipComments": true }]
  }
};
