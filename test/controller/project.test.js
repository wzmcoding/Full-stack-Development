const assert = require('assert');
const supertest = require('supertest');
const md5 = require('md5');
const elpisCore = require('../../elpis-core');

const signKey = 'happyWang12385398593583958395835';
const st = Date.now()

describe('测试 project 相关接口', function () {
    this.timeout(60000);

    let modelList;
    const projectList = [];
    let request;

    it('启动服务', async () => {
        const app = await elpisCore.start();
        modelList = require('../../model/index.js')(app);
        modelList.forEach(modelItem => {
            const { project } = modelItem;
            for (const pKey in  project) {
                projectList.push(project[pKey]);
            }
        })
        request = supertest(app.listen())
    })

    it('GET /api/project/list without proj_key', async () => {
        let tmpRequest = request.get('/api/project/list');
        tmpRequest = tmpRequest.set('s_t', st);
        tmpRequest = tmpRequest.set('s_sign', md5(`${signKey}_${st}`));
        const res = await tmpRequest;
        assert(res.body.success === true);

        const resData = res.body.data;
        assert(resData.length === projectList.length);
        for (let i = 0; i < resData.length; ++i) {
            // modelKey, key, name, desc, homePage
            const item = resData[i];
            assert(item.modelKey);
            assert(item.key);
            assert(item.name);
            assert(item.desc !== undefined);
            assert(item.homePage !== undefined);
        }
    })

    it('GET /api/project/list with proj_key', async () => {
        const { key: projKey} = projectList[Math.floor(Math.random() * projectList.length)];
        const { modelKey } = projectList.find(item => item.key === projKey);

        let tmpRequest = request.get('/api/project/list');
        tmpRequest = tmpRequest.set('s_t', st);
        tmpRequest = tmpRequest.set('s_sign', md5(`${signKey}_${st}`));
        tmpRequest = tmpRequest.query({ proj_key: projKey });
        const res = await tmpRequest;
        assert(res.body.success === true);

        const resData = res.body.data;
        assert(projectList.filter(item => item.modelKey === modelKey).length === resData.length);
        for (let i = 0; i < resData.length; ++i) {
            const item = resData[i];
            assert(item.modelKey);
            assert(item.key);
            assert(item.name);
            assert(item.desc !== undefined);
            assert(item.homePage !== undefined);
        }
    })

    it('Get /api/project/model_list', async () => {
        let tmpRequest = request.get('/api/project/model_list');
        tmpRequest = tmpRequest.set('s_t', st);
        tmpRequest = tmpRequest.set('s_sign', md5(`${signKey}_${st}`));
        const res = await tmpRequest;

        assert(res.body.success === true);
        const resData = res.body.data;
        assert(resData.length > 0);

        for (let i = 0; i < resData.length; ++i) {
            const item = resData[i];
            assert(item.model);
            assert(item.model.key);
            assert(item.model.name);
            assert(item.project);
            for (const projKey in item.project) {
                assert(item.project[projKey].key);
                assert(item.project[projKey].name);
            }
        }
    })
});