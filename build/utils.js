'use strict';
const path = require("path");
const config = require("../config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.assetsPath = function (_path) {
    return path.posix.join(_path);
}

exports.styleCssLoader = function (env) {
    const outLoaders = [{
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
    ];
    if (Object.is(env.NODE_ENV, "production")) {
        outLoaders.unshift({
            loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
            options: {
                publicPath: (resourcePath, context) => {

                    // https://webpack.js.org/plugins/mini-css-extract-plugin/#root
                    // publicPath is the relative path of the resource to the context
                    // e.g. for ./css/admin/main.css the publicPath will be ../../
                    // while for ./css/main.css the publicPath will be ../
                    return path.relative(path.dirname(resourcePath), context) + '/';
                }
            }
        });
    } else {
        outLoaders.unshift({
            loader: "vue-style-loader",
            options: {
                sourceMap: false,
                shadowMode: false,
            }
        })
    }
    const uotRules = [{
        test: /\.(sa|sc|c)ss$/,
        use: outLoaders
    }]
    return uotRules
}