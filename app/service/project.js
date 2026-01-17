module.exports = (app) => {
    const BaseService = require('./base')(app);
    const modelList = require('../../model/index.js')(app);
    return class ProjectService extends BaseService {
        /**
         * 获取统一模型下的项目列表（如果无 projKey, 取全量）
         * @param projKey
         */
        getList({ projKey }) {
            return modelList.reduce((preList, item) => {
                const { project }  = item;

                // 如果有 projKey 则只取当前同模型下的项目，不传的情况下则取全量
                if (projKey && !project[projKey]) {
                    return preList;
                }

                for (const pKey in project) {
                    preList.push(project[pKey]);
                }

                return preList;
            }, [])
        }

        /**
         * 获取所有模型与项目的结构化数据
         */
        async getModelList() {
            return modelList;
        }
    }
}