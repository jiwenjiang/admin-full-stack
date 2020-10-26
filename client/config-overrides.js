const { override, addLessLoader, addWebpackAlias, fixBabelImports, addWebpackPlugin } = require('customize-cra')
const path = require('path')
// const darkThemeVars = require('antd/dist/dark-theme')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src/styles'),
  varFile: path.join(__dirname, './src/styles/var.less'),
  mainLessFile: path.join(__dirname, './src/styles/index.less'),
  themeVariables: ['@primary-color'],
  indexFileName: 'index.html',
  generateOnce: false
}

const resolve = dir => path.join(__dirname, '.', dir)

const rewiredSourceMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin))
  return config
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    modifyVars: {
      // hack: `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
      // ...darkThemeVars,
      '@primary-color': '#13c2c2'
    },
    javascriptEnabled: true
  }),
  addWebpackAlias({
    '~': resolve('src')
  }),
  addWebpackPlugin(
    // new BundleAnalyzerPlugin(),
    new AntDesignThemePlugin(options)
  ),
  rewiredSourceMap()
)
