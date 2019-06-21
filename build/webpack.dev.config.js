const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const config = require("../config");
const path = require("path");
const devEnv = require("../config/dev.env");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);



module.exports = env => {

    let webpcakDevConfig = merge(baseWebpackConfig(env), {
        module: {
            rules: utils.styleLoaders({
                sourceMap: true,
                extrac: false,
                usePostCss: true
            })
        },
        // source maps 映射源文件，追踪错误出处 https://www.webpackjs.com/configuration/devtool/
        devtool: config.dev.devtool,
        mode: "development",
        devServer: {

            // 使用 inline 模式时，控制台显示消息级别
            clientLogLevel: "warning",

            // contentBase: path.resolve(__dirname, "../", "dist"),

            // 静态文件查找位置
            contentBase: false,

            //  auto open browser
            open: config.dev.autoOpenBrowser,
            host: HOST || config.dev.host,
            port: PORT || config.dev.port,

            // overlay 编译错误或警告时，在浏览器全屏显示 
            overlay: config.dev.errorOverlay ? {
                warnings: false,
                errors: true
            } : false,

            // hot update
            hot: true,

            hotOnly: true,

            // 一切服务都启用gzip 压缩
            compress: true,

            // 代理后端api
            proxy: config.dev.proxyTable,

            // 除了初始启动信息之外的任何内容都不会再被打印到控制台
            quiet: true,
            publicPath: config.dev.assetsPublicPath,

            // 当webpack watch 失败后，使用轮询监听
            watchOptions: {
                poll: true
            },

            // 任意 404 响应时都跳转至index.html
            historyApiFallback: {
                rewrites: [{
                    from: /.*/,
                    to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
                }, ],
            },
        },
        plugins: [

            // hot update
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                "process.env": devEnv
            })
        ]
    })

    let entryObject = utils.getEntryJs();
    Object.keys(entryObject).forEach(val => {
        let options = {
            title: val.toUpperCase(),
            folderName: val,
            chunk: val
        }

        webpcakDevConfig.plugins.push(new HtmlWebpackPlugin(utils.getHtmlTemplateConf(options, env)));
    })

    return webpcakDevConfig
}