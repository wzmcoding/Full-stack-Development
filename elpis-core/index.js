const Koa = require('koa');
const path = require('path');
const env = require('./env');

const { sep } = path // 兼容不同操作系统中的斜杠 sep = 根据操作系统自动选择 / 或 \

module.exports = {
    /**
     * 启动项目
     * @param options 项目配置
     */
    start(options = {}) {
        // 创建 Koa 实例
        const app = new Koa();
        // 应用配置
        app.options = options;
        // 基础路径 process.cwd() = 当前运行 node 命令时所在的目录
        app.baseDir = process.cwd();
        // 业务路径 path.resolve() = 拼接路径并规范化为绝对路径
        app.businessPath = path.resolve(app.baseDir, `.${sep}app`)
        // 初始化环境配置
        app.env = env;
        // 启动服务
        const port = process.env.PORT || 8080;
        const host = process.env.IP || '0.0.0.0';
        app.listen(port, host);
        console.log(`Server listening on ${host}:${port}`);
    }
}