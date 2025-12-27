const merge = require('webpack-merge');
const path = require('path');
const os = require('os');
const HappyPack = require('happypack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ClearWebpackPlugin = require('clean-webpack-plugin');

// 多线程 build 设置
const happpackCommonConfig = {
    debug: false,
    threadPool: HappyPack.ThreadPool({ size: os.cpus().length })
}

// 基类配置
const baseConfig = require('./webpack.base.js')

// 生产环境 webpack 配置
const webpackConfig = merge.smart(baseConfig, {
    // 指定生产环境
    mode: 'production',
    // 生产环境的 output 配置
    output: {
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        path: path.join(process.cwd(), "./app/public/dist/prod"),
        publicPath: '/dist/prod',
        crossOriginLoading: 'anonymous',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'happypack/loader?id=css'
                ]
            },
            {
                test: /\.js$/,
                include: [
                    // 只对业务代码进行 babel, 加快 webpack 打包速度
                    path.resolve(process.cwd(), './app/pages')
                ],
                use: [
                    'happypack/loader?id=js'
                ]
            }
        ]
    },
    // webpack 不会有大量 hints 提示信息， 默认为 warning
    performance: {
        hints: false,
    },
    plugins: [
        // 每次 build 前，清空 public/dist 目录
        new ClearWebpackPlugin(['public/dist'], {
            root: path.resolve(process.cwd(), './app/'),
            exclude: [],
            verbose: true,
            dry: false
        }),
        // 提取 css 的公共部分，有效利用缓存（非公共部分使用 inline）

        // 优化并压缩 css 资源

        // 多线程打包 js, 加快打包速度

        // 多线程打包 css, 加快打包速度

        // 浏览器在请求资源时不发送用户的身份凭证

    ],
    optimization: {
        // 使用 TerserPlugin 的并发和缓存，提升压缩阶段的性能

        // 清除 console.log
    }
});

module.exports = webpackConfig;