module.exports = (app) => {
    const BaseService = require('./base')(app);
    return class ProjectService extends BaseService {
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

        async list() {
            return [
                {
                    name: 'project1',
                    desc: '11111'
                },
                {
                    name: 'project2',
                    desc: '22222'
                },
            ]
        }
    }
}