'use strict';

const path = require("path");
const glob = require("glob");

module.exports = {
    dev: {
        // dev server setting
        host: "localhost",
        port: 8080,
        autoOpenBrowser: true,
        errorOverlay: true,

        // path
        assetsPublicPath: "/",
        assetsSubDirectory: 'static',
        proxyTable: {},

        // source maps
        devtool: "inline-source-map",
    },
    build: {
        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        entryFileArr: glob.sync(path.resolve(__dirname, "../src/pages/**/*.js")),
        templatePath: folderName => path.resolve(__dirname, `../src/pages/${folderName}/index.html`),
        // source maps
        devtool: "source-map",

        // html title
        htmlTitle: {

        }
    }
}