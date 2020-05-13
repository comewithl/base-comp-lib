module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    // 'react-hot-loader/babel',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/proposal-class-properties'],
    [
      'import',
      {
        libraryName: 'dpl-mobile',
        style: 'css'
      }
    ]
  ]
};
