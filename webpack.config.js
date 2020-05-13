const path = require('path');
module.exports = (options, config) => {
  return {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      // 单文件输出
      index: ['./src/index.js']
      // 多目录打包
      // DeliverEdit: path.resolve(__dirname, './src/components/DeliverEdit'),
      // InvoiceEdit: path.resolve(__dirname, './src/components/InvoiceEdit'),
      // MobileInput: path.resolve(__dirname, './src/components/MobileInput')
    },
    // 多文件输出
    // output: {
    //   path: path.resolve(__dirname, 'lib'),
    //   filename: '[name].js',
    //   library: 'otc-common-comp',
    //   libraryTarget: 'umd'
    // },
    // 单个入口文件
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: config.p ? '[name].min.js' : 'common.js',
      library: 'otc-comp-mobile',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    externals: {},
    module: {
      rules: [
        {
          test: /\.js|.jsx$/,
          use: {
            loader: 'babel-loader?cacheDirectory'
          }
        },
        {
          test: /\.less$/,
          use: [
            // MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            // MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            }
          ]
        }
      ]
    },
    externals: {
      // 定义外部依赖，避免把react和react-dom打包进去
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
      'dpl-mobile': {
        root: 'DplMobile',
        commonjs2: 'dpl-mobile',
        commonjs: 'dpl-mobile',
        amd: 'dpl-mobile'
      }
    },
    plugins: [
      // new MiniCssExtractPlugin({
      //   filename: 'common.min.css' // 提取后的css的文件名
      // })
    ]
  };
};
