const merge = require('webpack-merge');

// 基类配置
const baseConfig = require('./webpack.base.js')

// 生产环境 webpack 配置
const webpackConfig = merge.smart(baseConfig, {

});

module.exports = webpackConfig;