// // vue.config.js
// const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const glob = require('glob')
// const titles = require('./src/config/title')

// const pages = {}
// glob.sync('./src/views/**/app.js').forEach((filePath) => {
//     let chunk = filePath.split('./src/views/')[1].split('/app.js')[0]
//     const chunkFirstName = chunk.split('/')[0]
//     console.log(chunk)
//     pages[chunk] = {
//       entry: filePath,
//       template: 'public/index.html',
//       title: titles[chunk],
//       chunks: ['chunk-vendors', 'chunk-common', chunk]
//     }
//   })

// require('events').EventEmitter.prototype._maxListeners = 100

// function resolve(dir) {
//     return path.join(__dirname, dir)
// }
// module.exports = {
//     /**
//      * 默认配置
//      */
//     baseUrl:'/',
//     publicPath: process.env.NODE_ENV === 'production'
//         ? '/dist/'
//         : '/',
//     pages,
//     outputDir:'dist',
//     assetsDir:'',
//     // indexPath:'index.html',
//     filenameHashing:true,
//     pages:undefined,
//     lintOnSave:process.env.NODE_ENV !== 'production',
//     runtimeCompiler:false,
//     transpileDependencies:[],
//     crossorigin:undefined,
//     integrity:false,
//     // end

//     // 使用运行时编译器的 Vue 构建版本
//     runtimeCompiler: true,

//     // 开启生产环境SourceMap，设为false打包时不生成.map文件
//     productionSourceMap: false,

//     // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
//     lintOnSave: false,

//     devServer: {
//         open: false,        // 是否自动打开浏览器页面
//         host: '0.0.0.0',    // 指定使用一个 host，默认是 localhost
//         port: 8080,         // 端口地址
//         https: false,       // 使用https提供服务
//         // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
//         proxy: 'http://api.zhuishushenqi.com'
//     },

//     chainWebpack: (config) => {
//         config.resolve.alias
//             .set('@', resolve('src'))
//             .set('assets', resolve('src/assets'))
//             .set('components', resolve('src/components'))
//     },

//     configureWebpack: config => {
//         // 生产环境打包分析体积
//         if (process.env.NODE_ENV === 'production') {
//             return {
//                 plugins: [
//                     new BundleAnalyzerPlugin()
//                 ]
//             }
//         }
//     },
//     css: {
//         loaderOptions: {
//             sass: {
//                 data: `
//                 @import "@/style/mixin.scss";
//                 @import "@/style/_var.scss";
//                 `
//             }
//         }
//     },
// };
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 打包分析工具，可选用
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// sentry 接入，可选用
// const SentryPlugin = require('@tencent/webpack-sentry-plugin');

const glob = require('glob')
const titles = require('./src/config/title')

// 统一配置多页
const pages = {}
glob.sync('./src/views/**/app.js').forEach((filePath) => {
  let chunk = filePath.split('./src/views/')[1].split('/app.js')[0]
  const chunkFirstName = chunk.split('/')[0]
  if (chunkFirstName === 'user') {
    chunk += '/index'
  }
  console.log(chunk)
  pages[chunk] = {
    entry: filePath,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
console.log(pages)
module.exports = {
  // baseUrl: '/pcpages',
  pages,
  lintOnSave: true,
  outputDir: './dist',
  productionSourceMap: !(process.env.NODE_ENV === 'production'),
  devServer: {
    port: 83,
    inline: false,
    proxy: {
      '/openplatform': {
        target: 'http://127.0.0.1:80',
        ws: true,
        changeOrigin: true
      }
    } // 配置开发环境 URL 便于本地开发调试
  },
  chainWebpack: (config) => {
    config.plugins.delete('named-chunks')
    config.externals({
      'CKEDITOR': 'window.CKEDITOR'
    })
  },
  configureWebpack: (config) => {
    const plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
        sourceMap: true
      })
    ]
    // splitChunk 配置
    const splitChunksConfig = {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          minChunks: 2
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
      config.optimization.splitChunks = splitChunksConfig
    }
  }
}
