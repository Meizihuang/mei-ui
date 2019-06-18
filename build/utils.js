'use strict';
const path = require("path");
const config = require("../config");

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV = "production" ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

exports.cssLoaders = function (options) {
    const cssLoader = {
        loader: "css-loader",
        options: {
            sourceMap: options.sourceMap
        }
    };
    const sassLoader = {
        loader: "sass-loader",
        options: {
            sourceMap: options.sourceMap
        }
    }
    const postCssLoader = {
        loader: "sass-loader",
        options: {
            sourceMap: options.sourceMap
        }
    }
}

exports.styleLoaders = function (options) {
    if (!Object.is(Object.prototype.toString.call(options),"[object Object]")) return false;
    const output = [];
    const loaders = exports.cssLoaders(options);
}