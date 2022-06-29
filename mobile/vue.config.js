const fs = require('fs')
const webpack = require('webpack')
const VConsolePlugin = require('vconsole-webpack-plugin')
const proxyFile = require('./bootstarp').proxyFile
let proxy = {}

if (fs.existsSync(proxyFile)) {
  proxy = require(proxyFile)
}

module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'development', config =>
      config.plugin('VConsole').use(new VConsolePlugin({ enable: false}))
    );
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    config.optimization.splitChunks({
      cacheGroups: {
        lib_vue: {
          name: 'vue_vue-router_vuex_axios',
          priority: 10,
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)[\\/](.*)/,
          chunks: 'all'
        }
      }
    })
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: []
      }
    }
  },
  devServer: {
    proxy,
    clientLogLevel: 'info'
  }
}
