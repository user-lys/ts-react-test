const path = require('path')
const CracoAlias = require('craco-alias')
const CracoLessPlugin = require('craco-less')
const CracoAntDesignPlugin = require('craco-antd')

module.exports = {
  plugins: [
    /* antd组件按需加载&样式覆盖等 */
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          'src/styles/antd.theme.less'
        ),
      },
    },
    /* 支持less module */
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
        modifyLessRule(lessRule, _context) {
          lessRule.test = /\.(module)\.(less)$/
          lessRule.exclude = path.join(__dirname, 'node_modules')
          return lessRule
        },
      },
    },
    /* 别名设置 */
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      // 服务开启gzip
      compress: true,
      proxy: {
        '/api': {
          target: 'https://test.com/',
          changeOrigin: true,
          xfwd: false,
        },
      },
    }
  },
}
