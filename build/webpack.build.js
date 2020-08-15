const webpackMerge = require('webpack-merge')
const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin') // 替代了UglifyJsPlugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { name: libName } = require('../package.json')
const base = require('./webpack.base')

const isProduction = process.argv.indexOf('-p') > 0

console.log('isProduction', isProduction)

const entrys = {
  index: path.resolve(__dirname, '../src')
}

module.exports = webpackMerge(
  base({
    dev: !isProduction
  }),
  {
    mode: isProduction ? 'production' : 'development',
    optimization: {
      minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
      // splitChunks: { // 分块配置
      //   cacheGroups: {
      //     styles: {
      //       name: 'css/index',
      //       test: /\.css|\.less$/,
      //       chunks: 'all',
      //       enforce: true
      //     }
      //   }
      // }
    },
    devtool: false,
    entry: entrys,
    output: {
      path: path.resolve(__dirname, '../lib'),
      filename: 'main.min.js',
      library: libName,
      libraryTarget: 'umd'
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom'
        },
        mockjs: {
          root: 'mockJs',
          commonjs2: 'mockjs',
          commonjs: 'mockjs',
          amd: 'mockjs'
        },
        antd: {
          root: 'Antd',
          commonjs2: 'antd',
          commonjs: 'antd',
          amd: 'antd'
        }
      }
    ]
  }
)
