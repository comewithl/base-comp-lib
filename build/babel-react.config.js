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
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    'react-hot-loader/babel',
    ['@babel/plugin-transform-runtime']
    // '@babel/plugin-syntax-dynamic-import',
    // [
    //   'import',
    //   {
    //     libraryName: 'andt',
    //     style: 'css'
    //   }
    // ]
  ].concat(
    process.env.BUILD_TARGET === 'es'
      ? [
          [
            'babel-plugin-module-resolver',
            {
              root: ['../'],
              alias: {
                '@': './src'
              }
            }
          ]
        ]
      : []
  )
}
