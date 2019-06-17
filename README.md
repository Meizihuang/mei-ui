# webpack 打包工具与 gulp、grunt 的区别

- webpack 是一个模块，它可以递归的去解析打包，它可以对整个项目分析，遇到有依赖的模块，它会解析该模块的依赖，并且在解析依赖的时候再去加载依赖的依赖，一直到没有依赖。所以说 webpack 可以递归的去打包。

- 另一点不同是，webpack 支持代码分割，这是 gulp 和 grunt 所不具备的。

- 还有一点不同是 webpack 支持 es module 规范、commonJS、AMD 规范。

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

## 通过入口起点[entry]分离代码

## CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。

## 拆分公共模块，第一次加载时缓存至浏览器缓存中

## 使用 webpack 构建有三种主要代码类型

- 你或你的团队源代码 (app.js)
- 你的源码会依赖的任何第三方的 library 或“vendor” (vendor)
- webapck 的 runtime 和 manifest, 管理所有模块的交互

## runtime

runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

## manifest

在你的应用程序中，形如 index.html 文件、一些 bundle 和各种资源，都必须以某种方式加载和链接到应用程序，一旦被加载到浏览器中。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack 优化 之后，你精心安排的 /src 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来……

当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 **webpack_require** 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

## 多入口-将多个入口 chunk 的公共模块提取为一个单独 chunk

```webpack.prod.config.js
const webpack = require("webpack");
// 分离
entry: {
      index: './src/index.js',
      another: './src/another-module.js'
}

// 防止代码重复
new webpack.optimize.CommonsChunkPlugin({
  name: 'common' // 指定公共 bundle 的名称
})
```

## 使用 import("xxxx") 动态导入时的动态代码拆分

```webpack.prod.config.js
output: {
  chunkFilename: "[name].bundle.js"
}
```

# 懒加载

继续上文动态加载，当与用户第一次交互时（如 click） 才加载模块。

```xxx.js
user.onclick = (e) => import(/* webpackChunkName: "print" */ 'xxx.js').then (module => {
  var test = module.default;
  test();
})
```

[vue 实现懒加载](https://alexjover.com/blog/lazy-load-in-vue-using-webpack-s-code-splitting/)

# 缓存

[缓存](https://searchstorage.techtarget.com/definition/cache)

[浏览器缓存机制](https://juejin.im/entry/5ad86c16f265da505a77dca4)

通过配置使服务器文件发生变化时，浏览器不使用缓存.代码拆分为 "vendor" 、"manifest"、"app"

- keep module.id stable when vendor modules does not change

- 注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'manifest' 实例之前引入。

```webpack.prod.config.js

const webpack = require('webpack');

entry: {
  app: "./src/index.js",
  filename: "[name].[chunkhash].js",
  chunkFilename: "[id].[chunkhash].js"
}

plugins: [
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // generate rutime module manifest file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    // 一个 chunk 的多个子 chunk 会有公共的依赖,可以将这些公共模块移入父 chunk。
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
]
```

## 由于浏览器缓存，当部署新版本而没有更新资源文件名，浏览器可能会认为没有更新，就会使用它的缓存版本。

## 通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。

```

```
