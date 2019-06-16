# 记录一次 webpack 配置

## 保证 nodejs 是最新的 LTS 版本，建议本地安装 webpack

npm install --save-dev webpack

如果你使用 webpack 4+ 版本，你还需要安装 CLI。

npm install --save-dev webpack-cli

## npx 命令

Node 8.2+ 版本提供 npx 命令，可以运行在初始安装的 webpack 包(package)的 webpack 二进制文件（./node_modules/.bin/webpack）

即：npx webpack

## 使用一个配置文件 webpack.config.js

```webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## npm 脚本 package.json

```package.json
{
  "name": "mei-ui",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --config webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.34.0",
    "webpack-cli": "^3.3.4"
  },
  "dependencies": {
    "lodash": "^4.17.11"
  }
}
```

运行 npm run dev

# 资源管理

## css 资源加载 在 js 模块中 import 一个 css 文件 当该模块运行时，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中。

npm install --save-dev style-loader css-loader

```webpack.config.js
module: {
        rules: [{
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        }]
    }
```

## 图片资源加载

npm install --save-dev file-loader

## 字体资源加载

npm install --save-dev file-loader

# 输出管理

## HtmlWebpackPlugin 插件来 创建/dist index.html 并自动加载 js 文件

npm install --save-dev html-webpack-plugin

## clean-webpack-plugin 清理 /dist 无用的文件夹

npm install clean-webpack-plugin --save-dev

```webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
        // 生成 /dist index.html 并自动加载output js 文件
        new HtmlWebpackPlugin({
            title: "Output Management"
        }),
        // 清理 /dist无用文件夹
        new CleanWebpackPlugin(),
    ]
```

# 开发

## 使用 source map 追踪错误和警告

开发与生产环境有所不同，谨慎使用。[source-map 介绍](https://www.webpackjs.com/configuration/devtool/)

```webpack.config.js
devtool: 'inline-source-map'
```

## webpack-dev-server 提供一个简单的 web 服务器 自动编译代码+自动刷新浏览器

npm install --save-dev webpack-dev-server

```webpack.config.js
    devServer: {
        contentBase: "./dist"
    }
```

# 模块热替换 无刷新页面，更新模块 loader 使得模块热替换变得简单

```webpack.config.js
const webpack = require('webpack');
devServer: {
      contentBase: './dist',
     hot: true
    },
plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()
    ],
```

# 开发和生产环境配置，拆分为 webpack.base.config.js & webpack.dev.config.js & webpack.prod.config.js

## 使用 webpack-merge 合并配置文件

npm install --save-dev webpack-merge

## 指定环境

```webpck.prod.config.js
const webpack = require('webpack');
new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
     })
```

# 代码分离
