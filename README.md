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

[vue 实现懒加载](https://alexjover.com/blog/lazy-load-in-vue-using-webpack-s-code-splitting/)

# 缓存

[缓存](https://searchstorage.techtarget.com/definition/cache)

[浏览器缓存机制](https://juejin.im/entry/5ad86c16f265da505a77dca4)

## 分离好处

- 减少单一资源文件的大小（大小与数目之间有一个权衡）

- 对于多页面或者动态懒加载下的多路由情况下减少冗余的内容（同样的模块在不同的逻辑中可以被重复使用）

- 通过不用页面直接模块的复用提高缓存作用

- 将长期不会改变的内容打包到一个文件中避免新发布带来的资源更新，提高缓存的命中

## webpack SplitChunksPlugin 插件是一个可选的用于建立一个独立文件(又称作 chunk)的功能,production 模式下，它是默认开启的，仅仅对按需引入的动态加载模块有效。

## chunk 概念

chunk 是指最终被打包出来的代码块（构建产物每个文件就是一个 chunk），code splitting 是指按何种规则生成这些代码块。以下情况会做 code splitting:

- 多 entry ，多 entry 不仅可以用来多个独立应用的配置，还可以实现一个应用打包为多个包。

- 动态载入，也就是项目中通过 import() 引入的部分。

webpack 会 以 entry 和 import 为切割点划分文件，然后按照 optimization.splitChunks 配置来做公共 chunk 的提取。

## webpack 默认规则

- chunk 是共享的或者是在 node_modules 下面。

- chunk 的大小大于 30kb（压缩和 gzip 之前）。

- 每个页面最多有 5 个异步加载请求该 module

- 初始化页面最多有 3 个请求该 module

## default configuration

```webpack.config.js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: { // 默认
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: { // 默认
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        common: { // 这个不是默认的，我自己加的
          filename: '[name].bundle.js',
          name: 'common',
          chunks: 'initial',
          minChunks: 1,
          enforce: true,
        }
      }
    }
  }
};

```

## 参数解释

- chunks: async | initial | all , "async"针对异步加载的 chunk code splitting , "initial" 针对初始化 chunk , "all" 针对所有 chunk (当设 置为 "initial" 时，异步加载也会被分割)
- minSize: 生成 chunk 要 > 30k 时才会做 code splitting (针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中)
- maxSize: 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize
- minChunks: 被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
- maxAsyncRequests: 最多有 5 个异步加载请求该 module
- maxInitialRequests: 初始化的时候最多有 3 个请求该 module
- automaticNameDelimiter: 名字中间的间隔符
- name: chunk 的名称，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个，
- cacheGroups: 自定义规则，会继承和覆盖上面的配置, 它也有自己的默认配置。
- test: 符合这个规则的才会加到对应的 group 中
- priority: 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
- reuseExistingChunk: 当 module 未变时，是否可以使用之前的 chunk.
- enforce: 不管 maxInitialRequest maxAsyncRequests maxSize minSize 怎么样都会生成这个 chunk

## optimization.runtimeChunk

这个值默认是 false，当 runtimeChunk 为 true 时，会将 webpack 生成的 runtime 作为独立 chunk ，runtime 包含在模块交互时，模块所需的加载和解析逻辑,如果配置了改项，那么你需要在你的页面中提前引入相关的 runtime 的 js。

## 参考文章

[gitbub](https://github.com/frontend9/fe9-library/issues/242)
[掘金](https://juejin.im/post/5af15e895188256715479a9a)
