const path = require('path')

module.exports = {
  outputDir: './build',
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // configureWepack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components',
  //       src: '@'
  //     }
  //   }
  // },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  },
}