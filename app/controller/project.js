module.exports = (app) => {
    const BaseController = require('./base')(app);
    return class ProjectController extends BaseController {
        /**
         * 根据 proj_key 获取项目配置
         */
        get(ctx) {
            const { proj_key: projKey } = ctx.request.query;

            const { project: projectService } = app.service;
            const projConfig = projectService.get(projKey);

            if (!projConfig) {
                this.fail(ctx, '获取项目异常', 50000);
                return;
            }

            this.success(ctx, projConfig);
        }

        /**
         * 获取当前 projectKey 对应模型下的项目列表（如果无 projKey,则全量获取）
         */
        getList(ctx) {
            const { proj_key: projKey } = ctx.request.query;

            const { project: projectService } = app.service;
            const projectList = projectService.getList({projKey});

            // 构造关键数据 list
            const dtoProjectList = projectList.map(item => {
                const { modelKey, key, name, desc, homePage } = item;
                return { modelKey, key, name, desc, homePage};
            });

            this.success(ctx, dtoProjectList);
        }

        /**
         * 获取所有模型与项目的结构化数据
         */
        async getModelList(ctx) {
            const { project: ProjectService } = app.service;
            const modelList = await ProjectService.getModelList();

            // 构造返回结果，只返回关键数据
            const dtoModelList = modelList.reduce((preList, item) => {
                const { model, project } = item;

                // 构造 model 关键数据
                const { key, name, desc } = model;
                const dtoModel = { key, name, desc };

                // 构造 project 关键数据
                const dtoProject = Object.keys(project).reduce((preObj, projKey) => {
                    const { key, name, desc, homePage } = project[projKey];
                    preObj[projKey] = { key, name, desc, homePage };
                    return preObj;
                }, {});

                // 整合返回结构
                preList.push({ model: dtoModel, project: dtoProject });

                return preList;

            }, [])

            this.success(ctx, dtoModelList);
        }
    };
}