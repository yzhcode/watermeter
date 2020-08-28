/*
 * @Author: yzh
 * @Date: 2020-08-25 09:03:32
 * @Description: 配置文件
 */

const port = process.env.port || process.env.npm_config_port // dev port

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    host: "localhost",
    port: port,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
        '/Web/': {
            target: 'http://10.133.17.56:11007/',
            changeOrigin: true,
            pathRewrite: {
                '^/Web/': '/Web/'
            }
        }
    }
  }
}
