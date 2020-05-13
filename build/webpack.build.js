const webpackMerge = require('webpack-merge');
const path = require('path');
const packageConfig = require('../package.json')
const base = require('./webpack.base');
const libName = packageConfig.name;

const isProduction = process.argv.indexOf('-p') > 0;

const entrys = {
  index: path.resolve(__dirname, '../src/index.js')
};

module.exports = webpackMerge(base({
  dev: !isProduction
}), {
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  devtool: false,
  entry: entrys,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: chunkData => {
      return chunkData.chunk.name === 'index' ? '[name].js' : '[name]/index.js';
    },
    library: libName,
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    'antd': {
      commonjs: 'antd',
      commonjs2: 'antd',
      amd: 'antd',
      root: 'antd'
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  }
});

