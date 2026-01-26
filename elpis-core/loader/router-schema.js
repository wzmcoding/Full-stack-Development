const { glob } = require('glob');
const path = require('path');
const { sep } = path

/**
 * router-schema Loader
 * @param {object} app Koa 实例
 *
 * 通过 'json-schema & ajv' 对API规则进行约束，配合 api-params-verify 中间件使用
 *
 * app/router-schema/**.js
 *
 * 输出：
 *  app.routerSchema = {
 *      '${api1}':'${jsonSchema}',
 *      '${api2}':'${jsonSchema}',
 *      '${api3}':'${jsonSchema}',
 *      '${api4}':'${jsonSchema}',
 *      ...
 *  }
 */
module.exports = (app) => {
    let routerSchema = {}

    // 读取 elpis/app/router-schema/ 文件夹下所有.js文件
    const elpisRouterSchemaPath = path.resolve(__dirname, `..${sep}..${sep}app${sep}router-schema`);
    const elpisFileList = glob.sync(path.resolve(elpisRouterSchemaPath, `.${sep}**${sep}**.js`));
    elpisFileList.forEach(handleFile);

    // 读取 业务/app/router-schema/ 文件夹下所有.js文件
    const businessRouterSchemaPath = path.resolve(app.businessPath, `.${sep}router-schema`);
    const businessFileList = glob.sync(path.resolve(businessRouterSchemaPath, `.${sep}**${sep}**.js`));
    businessFileList.forEach(handleFile);

    // 注册所有 routerSchema , 使得可以 app.routerSchema 这样访问
    function handleFile(file) {
        routerSchema = {
            ...routerSchema,
            ...require(path.resolve(file))
        }
    }

    app.routerSchema = routerSchema;
}