const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    // source map
    devtool: 'inline-source-map',
    // webpack-dev-server
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 9090,
        open: true
    },
    // 设置为 production 环境 压缩
    mode: "production",
    // 模块加载
    module: {
        rules: [
            // css 加载
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            //  图片加载
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    //  插件
    plugins: [
        // 生成 /dist index.html 并自动加载output js 文件
        new HtmlWebpackPlugin({
            title: "Output Management"
        }),
        // 清理 /dist无用文件夹
        new CleanWebpackPlugin(),
        // HMR 热更新
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}