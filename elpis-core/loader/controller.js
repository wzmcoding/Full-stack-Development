const path = require('path');
const { glob } = require('glob');
const { sep } = path;

/**
 * controller Loader
 * @param {object} app Koa实例
 *
 * 加载所有 controller, 可通过 'app.controller.${目录}.${文件}访问'
 * 例子：
 * app/controller
 *  |
 *  | -- custom-module
 *          |
 *          | -- custom-controller.js
 *
 *      => app.controller.customModule.customController
 */

module.exports = (app) => {
    const controller =  {};

    // 读取 elpis/app/controller/ 文件夹下所有.js文件
    const elpisControllerPath = path.resolve(__dirname, `..${sep}..${sep}app${sep}controller`);
    const elpisFileList = glob.sync(path.resolve(elpisControllerPath, `.${sep}**${sep}**.js`));
    elpisFileList.forEach(handleFile);

    // 读取 业务/app/controller/ 文件夹下所有.js文件
    const businessControllerPath = path.resolve(app.businessPath, `.${sep}controller`);
    const businessFileList = glob.sync(path.resolve(businessControllerPath, `.${sep}**${sep}**.js`));
    businessFileList.forEach(handleFile);

    // 把内容加载到 app.controller 下
    function handleFile(file) {
        // 提取文件名称
        let name = path.resolve(file);
        // 截取路径 把 app/controller/custom-module/custom-controller.js 改为 custom-module/custom-controller
        name = name.substring(name.lastIndexOf(`controller${sep}`) + `controller${sep}`.length,name.lastIndexOf('.'))
        // 把'-'改为驼峰式 custom-module/custom-controller 改为 customModule/customController
        name = name.replace(/[_-][a-z]/ig,(s)=>s.substring(1).toUpperCase())
        //挂载 controller 到内存app对象中
        let tempController = controller;
        const names = name.split(sep);
        for(let i = 0 ,len = names.length; i<len;++i){
            if(i === len -1){
                const ControllerModule = require(path.resolve(file))(app);
                tempController[names[i]] = new ControllerModule();
            }else{
                if(!tempController[names[i]]){
                    tempController[names[i]] = {}
                }
                tempController = tempController[names[i]]
            }
        }
    }
    app.controller = controller
}