module.exports = {
  presets: process.env.BUILD_TARGET === 'es' ?
    ['@babel/env', '@babel/react', '@babel/typescript']
    : [[
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      }
    ],
    '@babel/preset-react',
      ['@babel/preset-typescript', {
        isTSX: true,
        allExtensions: true
      }]
    ], // 是否需要增加polyfill，将组件库兼容需求交给使用方,
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
