const merge = require("webpack-merge");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require("./webpack.base.config");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const {
  BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require("webpack");
const env = require("../config/prod.env");
const config = require("../config");
const utils = require("./utils");

module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    // 非入口 chunk 文件名称 (import("xxx") 如动态加载)
    chunkFilename: utils.assetsPath("js/[name].[chunkhash].js"),
    // 服务器文件发生更新浏览器不使用缓存
    filename: utils.assetsPath("js/[name].[chunkhash].js"),

  },
  mode: "production",
  devtool: config.build.devtool,
  plugins: [
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      include: /\/src/,
      exclude: /\/node_modules/,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env": env
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // 性能优化 可视化分析模板
    new BundleAnalyzerPlugin(),

    // 清理 /dist无用文件夹
    new CleanWebpackPlugin(),

    // 分离 css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css',
      chunkFilename: '[id].[hash:7].css',
    })
  ],

  optimization: {
    runtimeChunk: true,
    // runtimeChunk: {
    //   name: entrypoint => `manifest.${entrypoint.name}`
    // },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
})