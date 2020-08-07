const { join, resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 实现依赖包的资源缓存，提高打包速度
const DefaultPlugins = [
  new HardSourceWebpackPlugin()
]

module.exports = options => {
  const isDev = !!options.dev
  return {
    resolve: {
      extensions: ['.js', '.jsx', '.less', '.tsx'],
      alias: {
        '@': resolve(__dirname, '../src')
      }
    },
    module: {
      noParse: [/^(react|react-dom)/],
      rules: [
        {
          test: /\.tsx?$/,
          loaders: ['ts-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.jsx$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: join(__dirname, 'babel-react.config.js')
              }
            }
          ]
        },
        {
          test: /\.js?$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ],
          exclude: [/node_modules/]
        },
        {
          test: /\.less$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
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
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif)/,
          use: 'url-loader?limit=8000'
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: isDev ? [...DefaultPlugins] : [...DefaultPlugins,
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => {
        if (name === 'index') {
          return 'index.css'
        }
        return '/[name]/index.css' // 提取后的css的文件名
      }
    })
    ]
  }
}
