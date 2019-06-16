const merge = require("webpack-merge");
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig,{
    plugins: [
        new UglifyJSPlugin({
            test: /\.js($|\?)/i,
            include: /\/src/,
            exclude: /\/node_modules/
        })
    ]
})