const webpackMerge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base')
const { name: libName } = require('../package.json')

const isProduction = process.argv.indexOf('-p') > 0

console.log('isProduction', isProduction)

const entrys = {
  index: path.resolve(__dirname, '../src'),
}

module.exports = webpackMerge(
  base({
    dev: true,
  }),
  {
    mode: 'development',
    optimization: {
      minimizer: [
        // new TerserJSPlugin(),
        // new OptimizeCSSAssetsPlugin()
      ],
    },
    devtool: false,
    entry: entrys,
    output: {
      path: path.resolve(__dirname, '../lib'),
      filename: 'main.js',
      library: libName,
      libraryTarget: 'commonjs2',
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
        mockjs: {
          root: 'mockJs',
          commonjs2: 'mockjs',
          commonjs: 'mockjs',
          amd: 'mockjs',
        },
      }
    ],
  }
)
