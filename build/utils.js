'use strict';
const path = require("path");
const config = require("../config");

exports.assetsPath = function (_path) {
    return path.posix.join(_path);
}