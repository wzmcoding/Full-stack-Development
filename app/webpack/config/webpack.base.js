const path = require('path');
/**
 * webpack 基础配置
 */
module.exports = {
    // 入口配置
    entry: {
        'entry.page1': './app/pages/page1/entry.page1.js',
        'entry.page2': './app/pages/page2/entry.page2.js'
    },
    // 模块解析配置（决定了要加载哪些模块，以及用什么样的方式去解析）
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.js$/,
                include: [
                    // 只对业务代码进行 babel, 加快 webpack 打包速度
                    path.resolve(process.cwd(), './app/pages'),
                ],
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpe?g|gif)(\?.+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 300,
                        esModule: false,
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: 'file-loader'
            }
        ]
    },
    // 产物输出路径
    output: {
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        path: path.join(process.cwd(), "./app/public/dist/prod"),
        publicPath: '/dist/prod',
        crossOriginLoading: 'anonymous',
    },
    // 配置模块解析的具体行为(找到具体的路径)
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css'],
        alias: {
            $pages: path.resolve(process.cwd(), './app/pages'),
        },
    },
    // 配置 webpack 插件
    plugins: [],
    // 配置代码打包输出优化（代码分割，模块合并，缓存，TreeShaking,压缩等优化策略）
    optimization: {}
}