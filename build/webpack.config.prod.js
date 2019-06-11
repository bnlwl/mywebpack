/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('./webpack.config.base.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    publicPath: './', // js 引用的路径或者 CDN 地址
    filename: '[name].[contenthash].js', // 打包后生成的 js 文件
    chunkFilename: '[name].[contenthash].js' // 代码拆分后的文件名
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
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
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        polyfill: {
          test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
          name: 'polyfill',
          priority: 12,
        },
        commons: {
          name: 'commons',
          minChunks: 2, // 最小公用次数
          minSize: 1, // 表示在压缩前的最小模块大小，超过该配置则压缩，默认为30kb
          priority: 11,
          reuseExistingChunk: true // 公共模块必开启
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].css'
    }),
    // 压缩 css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {safe: true, discardComments: {removeAll: true}},
      canPrint: true
    })
  ]
});
