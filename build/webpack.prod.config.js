const merge = require("webpack-merge");
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require("./webpack.base.config");
const {
  BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const env = require("../config/prod.env");
const config = require("../config");
const utils = require("./utils");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("webpack.parod.config.js" + process.env.NODE_ENV);

let webpackProdConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extrac: true,
      usePostCss: true
    })
  },
  output: {
    path: config.build.assetsRoot,

    // 非入口 chunk 文件名称 (import("xxx") 如动态加载)
    chunkFilename: utils.assetsPath("js/[name].[chunkhash].js"),

    // 服务器文件发生更新浏览器不使用缓存
    filename: utils.assetsPath("js/[name].[hash:8].js"),

  },
  mode: "production",
  devtool: config.build.devtool,
  plugins: [

    // 压缩js 
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      include: /\/src/,
      exclude: /\/node_modules/,
      sourceMap: true
    }),

    // 指定环境
    new webpack.DefinePlugin({
      "process.env": env
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // 性能优化 可视化分析模板
    new BundleAnalyzerPlugin(),

    // 分离css
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css")
      // chunkFilename: utils.assetsPath("css/[id].[contenthash].css")
    }),

    // css 优化、去重、压缩 与 optimization.minimize效果一样，二选一
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // cssProcessorOptions: cssnanoOptions,
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeUnicode: false
        }]
      },
      canPrint: true
    }),

    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ],

  optimization: {

    // manifest file
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },

    runtimeChunk: {
      name: 'runtime'
    },

    // code splitting
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
        },
        // splitting entry file public css code
        // styles: {
        //   name: "styles",
        //   test: /\.css$/,
        //   enforce: true
        // }
      }
    },

    // css 优化、去重、压缩 与 plugins new OptimizeCSSAssetsPlugin 效果一样，二选一
    // minimize: [
    //   new OptimizeCSSAssetsPlugin({
    //     assetNameRegExp: /\.css$/g,

    //     // 预处理器 默认 "cssnano"
    //     cssProcessor: require('cssnano'),

    //     // cssProcessorOptions 和 cssProcessorPluginOptions 都是指定 cssProcessor 所需的参数
    //     // cssProcessorOptions: cssnanoOptions,
    //     cssProcessorPluginOptions: {
    //       preset: ['default', {
    //         discardComments: {
    //           removeAll: true,
    //         },
    //         normalizeUnicode: false
    //       }]
    //     },

    //     // 是否打印处理过程中的日志
    //     canPrint: true
    //   })
    // ]
  }
})

let entryObject = utils.getEntryJs();
Object.keys(entryObject).forEach(val => {
  let options = {
    title: val.toUpperCase(),
    folderName: val,
    chunk: val
  }
  webpackProdConfig.plugins.push(new HtmlWebpackPlugin(utils.getHtmlTemplateConf(options)));
})

module.exports = webpackProdConfig;