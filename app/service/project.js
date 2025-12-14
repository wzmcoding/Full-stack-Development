module.exports = (app) => {
    return class ProjectService {
        /**
         * 获取项目列表
         * @params {object} ctx 上下文
         */
        async getList(ctx) {
            return [
                {
                    id: 1,
                    name: '项目1'
                },
                {
                    id: 2,
                    name: '项目2'
                }
            ]
        }
    }
}