'use strict';
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require("../config");

exports.assetsPath = function (_path, env = {
    NODE_ENV: "development"
}) {
    const assetsSubDirectory = env.NODE_ENV === "production" ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

exports.cssLoaders = function (options) {
    const cssLoader = {
        loader: "css-loader",
        options: {
            sourceMap: options.sourceMap
        }
    };
    const postCssLoader = {
        loader: "postcss-loader",
        options: {
            sourceMap: options.sourceMap
        }
    };
    const sassLoader = {
        loader: "sass-loader",
        options: {
            sourceMap: options.sourceMap
        }
    };

    let loaders = options.usePostCss ? [cssLoader, postCssLoader, sassLoader] : [cssLoader, sassLoader];
    if (options.extrac) {
        loaders = [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: (resourcePath, context) => {
                    // publicPath is the relative path of the resource to the context
                    // e.g. for ./css/admin/main.css the publicPath will be ../../
                    // while for ./css/main.css the publicPath will be ../
                    return path.relative(path.dirname(resourcePath), context) + '/';
                }
            }
        }].concat(loaders);
    } else {
        loaders = ["style-loader"].concat(loaders);
    }
    return loaders
}

exports.styleLoaders = function (options) {
    if (!Object.is(Object.prototype.toString.call(options), "[object Object]")) return false;
    const output = [];
    const loaders = exports.cssLoaders(options);
    output.push({
        test: /\.(sa|sc|c)ss$/,
        use: loaders
    })
    return output
}

exports.getEntryJs = function () {
    let filesArr = config.build.entryFileArr;
    let output = {};
    let temp = "";
    filesArr.forEach(ele => {
        temp = ele.split("src/")[1].split("/")[1];
        if (temp.includes(".js")) {
            throw (new Error("Please classify files"));
        } else {
            output[temp] = ele;
        }
    })
    return output
}

exports.getHtmlTemplateConf = function (options, env = {
    NODE_ENV: "development"
}) {
    if (!Object.is(Object.prototype.toString.call(options), "[object Object]")) return false;
    let optionsConf = {
        title: options.title,
        filename: `${options.folderName}.html`,
        template: config.build.templatePath(options.folderName),
        inject: true,
        favicon: path.resolve(__dirname, "../static/images/logo.png"),
        chunks: [options.chunk]
    };

    if (env.NODE_ENV === "production") {
        optionsConf = Object.assign({}, optionsConf, {
            filename: `${options.folderName}.[hash:8].html`,
            meta: {
                "viewport": "width=device-width,initial-scale=1.0,user-scalable=no"
            },
            minify: {
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
                removeAttributeQuotes: true // 去除属性引用
            },
            chunks: ["runtime", "vendors", options.chunk]
        })
    }
    return optionsConf
}