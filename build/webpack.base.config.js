const path = require("path");
const utils = require("./utils");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const config = require("../config");


module.exports = env => {

    let webpackBaseConf = {
        context: path.resolve(__dirname, '../'),
        entry: utils.getEntryJs(),
        output: {
            filename: "[name].js",
            path: config.build.assetsRoot,
            publicPath: env.NODE_ENV === 'production' ?
                config.build.assetsPublicPath : config.dev.assetsPublicPath
        },
        resolve: {

            // 别名
            alias: {
                "@": path.resolve(__dirname, "../src")
            },

            // 省略后缀
            extensions: ['.js', '.json', '.css', '.scss']
        },
        module: {
            rules: [{
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader'
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: utils.assetsPath("images/[name].[hash:7].[ext]", env)
                        }

                    }]
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: utils.assetsPath("media/[name].[hash:7].[ext]", env)
                        }
                    }]

                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: utils.assetsPath("fonts/[name].[hash:7].[ext]", env)
                        }
                    }]
                }
            ]
        },
        plugins: [

            // 清理 /dist无用文件夹
            new CleanWebpackPlugin(),

            // copy custom static assets
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }])
        ]
    }
    return webpackBaseConf
}