const merge = require("webpack-merge");
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require("./webpack.base.config");
const webpack = require("webpack");
const env = require("../config/prod.env")["NODE_ENV"];
const config = require("../config");

module.exports = merge(baseWebpackConfig,{
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
            "process.env.NODE_ENV": JSON.stringify(env)
        })
    ]
})