const { glob } = require('glob');
const path = require('path');
const { sep } = path;

/**
 * service Loader
 * @param {object} app Koa实例
 *
 * 加载所有 service, 可通过 'app.service.${目录}.${文件}访问'
 * 例子：
 * app/service
 *  |
 *  | -- custom-module
 *          |
 *          | -- custom-service.js
 *
 *      => app.service.customModule.customService
 */

module.exports = (app) => {
    const service = {};

    //读取 elpis/app/service/ 文件夹下所有.js文件
    const elpisServicePath = path.resolve(__dirname, `..${sep}..${sep}app${sep}service`);
    const elpisFileList = glob.sync(path.resolve(elpisServicePath, `.${sep}**${sep}**.js`));
    elpisFileList.forEach(handleFile);

    //读取 业务/app/service/ 文件夹下所有.js文件
    const businessServicePath = path.resolve(app.businessPath, `.${sep}service`);
    const businessFileList = glob.sync(path.resolve(businessServicePath, `.${sep}**${sep}**.js`));
    businessFileList.forEach(handleFile);

    // 把内容加载到 app.service 下
    function handleFile(file) {
        //提取文件名称
        let name = path.resolve(file);
        //截取路径 把 app/service/custom-module/custom-service.js 改为 custom-module/custom-service
        name = name.substring(name.lastIndexOf(`service${sep}`) + `service${sep}`.length, name.lastIndexOf('.'))
        //把'-'改为驼峰式 custom-module/custom-service 改为 customModule/customService
        name = name.replace(/[_-][a-z]/ig,(s)=>s.substring(1).toUpperCase())
        //挂载 service 到内存app对象中
        let tempService = service;
        const names = name.split(sep);
        for(let i = 0 ,len = names.length; i<len;++i){
            if(i === len -1){
                const ServiceModule = require(path.resolve(file))(app);
                tempService[names[i]] = new ServiceModule();
                // tempService[names[i]] = require(path.resolve(file))(app);  // { customModule: { customService: require(path.resolve(file))(app) } }
            }else{
                if(!tempService[names[i]]){
                    tempService[names[i]] = {} // { customModule: {} }
                }
                tempService = tempService[names[i]] // { customModule: {} } 取的 customModule对象重新赋值给tempService，处理嵌套结构
            }
        }
    }
    app.service = service
}