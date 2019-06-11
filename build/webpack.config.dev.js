/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.base.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  output: {
    publicPath: '/', // js 引用的路径或者 CDN 地址
    filename: '[name].js', // 打包后生成的 js 文件
    chunkFilename: '[name].js' // 代码拆分后的文件名
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 在一个css中引用另一个css，也会执行前两个loader。
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    port: 8000,
    hot: true,
    overlay: true,
    proxy: {
      '/api/': {
        target: 'https://api.github.com/',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
          Cookie: ''
        },
        pathRewrite: {'^/api': ''},
      }
    },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{from: /.*/, to: '/index.html'}]
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
