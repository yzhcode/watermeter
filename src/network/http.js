/*
 * @Author: yzh
 * @Date: 2020-08-26 17:27:45
 * @Description: file content
 */
import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'

import qs from 'qs';
import router from '@/router'

const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

// create an axios instance
const http = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    method: "post",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    credentials: "include",
    withCredentials: true, //允许跨域域名设置cookie
    timeout: 30 * 1000 // 30秒超时
})

// request interceptor
http.interceptors.request.use(
    config => {
        console.log('http request 拦截 config :>> ', config);
        if ((config.method).toLowerCase() === 'post') {
            config.data = qs.stringify(config.data, {
                arrayFormat: 'brackets'
            })
        } else if ((config.method).toLowerCase() === 'get') {
            config.params = {
                timestamp: new Date().getTime(), //时间戳
                ...config.data
            }
        }

        return config
    },
    error => {
        console.log('http request 拦截 error :>> ', error);
        return Promise.reject(error)
    }
)

// response interceptor
http.interceptors.response.use(
    response => {
        console.log('http response 拦截 :>> ', response);
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (response.status === 200) {
            if (response.data.result == "noauth") {
                console.log("http response 拦截: ", '没认证，去登录');
                toLogin()
            } else {
                return Promise.resolve(response);
            }
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log("http response 拦截 error: ", error);
        if (error.response) {
            return Promise.reject(error.response.data)
        } else {
            if (error.message.includes('timeout')) {

            }
            return Promise.reject(error); // reject这个错误信息
        }
    }
)

// http.install = function (Vue, options) {
//     console.log('object :>> ', 44444);
//     Vue.prototype.$https = function (options) {
//         return http(options);
//     }
// };

export default http