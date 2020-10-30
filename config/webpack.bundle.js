const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const baseConfig = require('./webpack.config')
const prodConfig = require('./webpack.prod')
const bundleConfig = {
  plugins: [new BundleAnalyzerPlugin()],
}

module.exports = merge(baseConfig, prodConfig, bundleConfig)
