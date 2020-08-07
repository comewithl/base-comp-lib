let path = require('path');
const { resolve } = path;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base')
const mockTable = require('../mock/mock-table');
const url = require('url');
const glob = require('glob')


/*
 * 强制删除 node 中的模块缓存, 实现修改 mock 下文件之后能够及时更新
 */
function forceRequire (reqPath) {
  delete require.cache[reqPath];
  return require(reqPath);
}

function isPromise (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function writeResponse (res, json) {
  const content = typeof json === 'object' ? JSON.stringify(json) : json;
  res.end(content);
}

module.exports = function (options) {
  console.log('options', options)
  return merge(baseConfig({
    dev: options.dev
  }), {
    mode: 'development',
    entry: path.resolve(__dirname, '../example/index.js'),
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      quiet: true,
      compress: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      contentBase: [path.resolve(__dirname, '../'), path.resolve(__dirname, '../mock')],
      before (app) {
        app.all(
          ['/api/*'],
          function (req, res, next) {
            if (options.mock) {
              const entries = Object.keys(mockTable);
              const { pathname } = url.parse(req.originalUrl);
              console.log('cui log pathname', pathname)
              if (entries.includes(pathname)) {
                console.log('__dirname', __dirname)
                const list = glob.sync('../mock/' + mockTable[pathname], { cwd: path.resolve(__dirname) });
                if (list.length > 0) {
                  res.statusCode = 200;
                  const mockResultSource = forceRequire(list[0])
                  const mockResult = typeof mockResultSource === 'function' ? mockResultSource() : mockResultSource
                  console.log('mockResult', mockResult)
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                  if (isPromise(mockResult)) {
                    mockResult.then(data => {
                      writeResponse(res, data)
                    }).catch(e => {
                      res.end(e)
                    })
                  } else {
                    writeResponse(res, mockResult)
                  }
                } else {
                  res.statusCode = 404;
                  res.end()
                }
              } else {
                next();
              }
            }
            next();
          }
        )
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1/',
          // pathRewrite: { '^/api': '' },
          changeOrigin: true
        },
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../example/index.html')
      })
    ],
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
    },
  })
};
