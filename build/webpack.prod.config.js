const merge = require("webpack-merge");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require("./webpack.base.config");
const webpack = require("webpack");
const env = require("../config/prod.env");
const config = require("../config");
const utils = require("./utils");

module.exports = merge(baseWebpackConfig, {
    output: {
        path: config.build.assetsRoot,
        // 服务器文件发生更新浏览器不使用缓存
        filename: utils.assetsPath("js/[name].[chunkhash].js"),
        // 非入口 chunk 文件名称 (import("xxx") 如动态加载)
        chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
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
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
})