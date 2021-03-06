// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const name = 'siri blog'
const port = 8080

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/SRBlog/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: port,
    open: false,
    proxy: {
      '/user-api': {
        target: 'http://localhost:8003',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/user-api': ''
        }
      },
      '/article-api': {
        target: 'http://localhost:8002',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/article-api': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  }
}
