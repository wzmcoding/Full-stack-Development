/**
 * 前端封装的 curl 方法
 * @params options 请求参数
 */

const md5 = require("md5")
import { ElMessage } from 'element-plus'
import axios from 'axios'

const curl = ({
    url, // 请求地址
    method = 'post', // 请求方法
    headers = {}, // 请求头
    query = {}, // url query
    data = {},
    responseType = 'json',
    timeout = 60000,
    errorMessage = '网络异常'
}) => {
    // 接口签名处理（让接口变动态）
    const signKey = "happyWang12385398593583958395835"
    const st = Date.now()

    const dtoHeaders = {
        ...headers,
        s_t: st,
        s_sign: md5(`${signKey}_${st}`),
    }

    if (url.indexOf('/api/proj') > -1 && window.projKey) {
        dtoHeaders.proj_key = window.projKey;
    }

    // 构造请求参数
    const axiosSetting = {
        url, // 请求地址
        method, // 请求方法
        params: query,
        data,
        responseType,
        timeout,
        headers: dtoHeaders,
    }
    return axios.request(axiosSetting).then((response) => {
        const resData = response.data || {}
        // 后端返回格式
        const { success } = resData
        // 失败
        if (!success) {
            const { message, code } = resData
            if (code === 442) {
                ElMessage.error('请求参数异常');
            } else if (code === 445) {
                ElMessage.error('请求不合法');
            } else if (code === 446) {
                ElMessage.error('缺少项目必要参数');
            } else if (code === 50000) {
                ElMessage.error(message);
            } else {
                ElMessage.error(errorMessage);
            }

            console.error(message)

            return Promise.resolve({ success, code, message })
        }
        // 成功
        const { data, metadata } = resData
        return Promise.resolve({ success, data, metadata })
    }).catch(error => {
        const { message } = error
        if (message && message.match(/timeout/)) {
            return Promise.resolve({
                message: 'Request Timeout',
                code: 504
            })
        }
        return Promise.resolve(error)
    })
}

export default curl