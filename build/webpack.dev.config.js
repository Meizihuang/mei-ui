const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config.js");
const config = require("../config");
const path = require("path");

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: "warning ",
        contentBase: path.resolve(__dirname, "../", "dist"),
        //  auto open browser
        open: config.dev.autoOpenBrowser,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true
        } : false,
        // hot update
        hot: true,
        compress: true,
        proxy: config.dev.proxyTable,
        quiet: true,
        publicPath: config.dev.assetsPublicPath,
        watchOptions: {
            poll: true
        },
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
        new webpack.HotModuleReplacementPlugin()
    ]
})

console.info(devWebpackConfig);

module.exports = devWebpackConfig