const { join, resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 实现依赖包的资源缓存，提高打包速度
const DefaultPlugins = [new HardSourceWebpackPlugin()]

module.exports = options => {
  const isDev = !!options.dev
  return {
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.less'], // 尽量别放less,scss的extension配置，不然就必须再js/jsx/tsx/ts之后
      alias: {
        '@': resolve(__dirname, '../src')
      }
    },
    module: {
      noParse: [/^(react|react-dom)/],
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              // options: {
              //   presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
              // }
              options: {
                configFile: join(__dirname, 'babel-react.config.js')
              }
            }
            // 'ts-loader'
          ],
          exclude: /node_modules/
        },
        // {
        //   test: /\.jsx$/,
        //   use: [
        //     {
        //       loader: 'babel-loader',
        //       options: {
        //         configFile: join(__dirname, 'babel-react.config.js')
        //       }
        //     }
        //   ]
        // },
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
            // isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                reloadAll: true
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['> 0.15% in CN']
                  })
                ]
              }
            },
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
            // isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                reloadAll: true
              }
            },
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
    plugins: [
      ...DefaultPlugins,
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
