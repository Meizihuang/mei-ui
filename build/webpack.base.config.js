const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageConfig = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const config = require("../config");

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        index: "./src/pages/index/index.js",
        news: "./src/pages/news/index.js"
    },
    output: {
        filename: "[name].js",
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                // publicPath is the relative path of the resource to the context
                                // e.g. for ./css/admin/main.css the publicPath will be ../../
                                // while for ./css/main.css the publicPath will be ../
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000
                    }

                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        }
                    }

                ]

            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    }
                }]
            }
        ]
    },
    plugins: [
        // 生成 /dist index.html 并自动加载output js 文件
        new HtmlWebpackPlugin({
            title: packageConfig.name
        }),
        // 清理 /dist无用文件夹
        new CleanWebpackPlugin(),
    ]
}