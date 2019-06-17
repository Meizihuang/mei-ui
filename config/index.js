'use strict';

const path = require("path");

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
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        // source maps
        devtool: "source-map",
    }
}