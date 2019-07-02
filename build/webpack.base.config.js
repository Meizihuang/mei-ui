const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageConfig = require('../package.json');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = require("../config");

function resolve(_path) {
    return path.join(__dirname, "../", _path)
}

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
        resolve: {
            extends: ['.js', '.vue', '.json', '.ts'],
            alias: {
                '@': resolve("src")
            }
        },
        module: {
            rules: [{
                    test: /\.vue$/,
                    use: {
                        loader: "vue-loader"
                    }
                },
                {
                    test: /\.js/,
                    include: path.resolve(__dirname, "../src"),
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [{
                            loader: "vue-style-loader", // creates style nodes from JS strings
                            options: {
                                sourceMap: false,
                                shadowMode: false
                            }
                        },
                        {
                            loader: "css-loader", // translates CSS into CommonJS
                            options: {
                                // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                                importLoaders: 2,
                                sourceMap: false,
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: false,
                            }
                        },
                        {
                            loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
                            options: {
                                sourceMap: false
                            }
                        }

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
                favicon: path.resolve(__dirname, "../public/logo.png"),
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
            }),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, "../public"),
                to: path.resolve(__dirname, "../dist"),
                ignore: [".*"]
            }]),
            new VueLoaderPlugin()
        ]
    }

    return baseWebpackConfig
}