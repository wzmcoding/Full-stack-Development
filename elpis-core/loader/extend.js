const { glob } = require('glob');
const path = require('path');
const { sep } = path;

/**
 * extend Loader
 * @param {object} app Koa实例
 *
 * 加载所有 extend, 可通过 'app.extend.${文件}访问'
 * 例子：
 * app/extend
 *  |
 *  | -- custom-extend
 *
 *      => app.extend.customExtend
 */

module.exports = (app) => {
    // 读取 elpis/app/extend/ 文件夹下所有.js文件
    const elpisExtendPath = path.resolve(__dirname, `..${sep}..${sep}app${sep}extend`);
    const elpisFileList = glob.sync(path.resolve(elpisExtendPath, `.${sep}**${sep}**.js`));
    elpisFileList.forEach(handleFile);

    // 读取 业务/app/extend/ 文件夹下所有.js文件
    const businessExtendPath = path.resolve(app.businessPath, `.${sep}extend`);
    const businessFileList = glob.sync(path.resolve(businessExtendPath, `.${sep}**${sep}**.js`));
    businessFileList.forEach(handleFile);

    // 把内容加载到 app.extend 下
    function handleFile(file) {
        //提取文件名称
        let name = path.resolve(file);
        //截取路径 把 app/extend/custom-extend.js 改为 custom-extend
        name = name.substring(name.lastIndexOf(`extend${sep}`) + `extend${sep}`.length,name.lastIndexOf('.'))
        //把'-'改为驼峰式 custom-extend 改为 customExtend
        name = name.replace(/[_-][a-z]/ig,(s)=>s.substring(1).toUpperCase())

        //过滤 app 已存在的Key，做重名处理
        for(const key in app){
            if(key === name){
                console.log(`[extend load error] name:${name} is already in app`)
                return
            }
        }
        app[name] = require(path.resolve(file))(app);
    }
} 