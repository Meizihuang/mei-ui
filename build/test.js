'use strict';

const path = require("path");
const glob = require("glob");
const config = require("../config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const utils = require("./utils");

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

let htmlPlugin = [];
Object.keys(output).forEach(val => {
    let options = {
        title: val.toUpperCase(),
        folderName: val,
        chunk: val
    }
    htmlPlugin.push(new HtmlWebpackPlugin(utils.getHtmlTemplateConf(options)));
})
console.log(htmlPlugin);