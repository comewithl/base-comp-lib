module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'standard', 'standard-react', 'prettier/@typescript-eslint', // 使用eslint-config-prettier禁用一些与Prettier冲突的ESLint规则
  'plugin:prettier/recommended' // 启用eslint-plugin-prettier和eslint-config-prettier，使编辑器显示错误提示，确保这项是扩展数组中的最后一个配置
  ],
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'xss', '@typescript-eslint'],
  rules: {
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/no-unused-prop-types': [0],
    'object-curly-spacing': 'never',
    'space-before-function-paren': ['warn', 'always'],
    camelcase: 0,
    eqeqeq: 0,
    'max-len': ['error', 120],
    'arrow-parens': ['error', 'as-needed'],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    'eol-last': 0,
    'comma-dangle': 0,
    'object-curly-spacing': 0,
    'no-irregular-whitespace': ['error', { skipComments: true }]
  }
}
