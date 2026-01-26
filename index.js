// 引入elpis-core
const ElpisCore = require('./elpis-core')

module.exports = {
    /**
     * 启动 elpis
     * @param options 项目配置, 透传到 elpis-core
     */
    serverStart(options = {}) {
        const app = ElpisCore.start(options);
        return app;
    }
}
