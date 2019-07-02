const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageConfig = require('../package.json');

const config = require("../config");

module.exports = env => {
    const baseWebpackConfig = {
        context: path.resolve(__dirname, '../'),
        entry: {
            app: "./src/main.js"
        },
        output: {
            filename: "[name].js",
            path: config.build.assetsRoot,
            publicPath: env.NODE_ENV === 'production' ?
                config.build.assetsPublicPath : config.dev.assetsPublicPath
        },
        module: {
            rules: [{
                    test: /\.js/,
                    include: path.resolve(__dirname, "../src"),
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader"
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
                title: packageConfig.name,
                filename: "index.html",
                template: config.build.template,
                inject: true,
                favicon: path.resolve(__dirname, "")
            }),
        ]
    }

    return baseWebpackConfig
}