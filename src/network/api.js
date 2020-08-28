/*
 * @Author: yzh
 * @Date: 2020-08-25 15:19:50
 * @Description: file content
 */

import Vue from 'vue'
import http from '@/network/http'
// import http from '@/network/http'
// Vue.use(http)
import md5 from 'js-md5'
import store from '@/store'

export default {
    /**
     * @description: 用户登录
     * @param {username:用户名, password: 密码} 
     * @return {type} 
     */
    userLogin(username, password) {
        let md5password = '';
        let specialRegExp = /^[a-z0-9]{32,32}$/; //特殊用途密码
        if (specialRegExp.test(password)) {
            md5password = password;
        } else {
            md5password = md5(password);
        }

        let self = this;
        this.loginSuccessResponseDataValid = function (res) {
            console.log("api: 登录成功，检查返回数据合法性 = " + JSON.stringify(res));
            if (res.username && (0 < parseInt(res.role) < 4)) {
                if (parseInt(res.role) == 2 || parseInt(res.role) == 3) {
                    if (parseInt(res.role_type) == 1 || parseInt(res.role_type) == 2) {
                        console.log("api: 账号有效，站点账号");
                        return true;
                    }
                } else {
                    console.log("api: 账号有效");
                    return true;
                }
            }
            console.log("api: 账号无效");
            return false;
        }

        return new Promise((resolve, reject) => {
            return http({
                url: '/Web/WaterAffairs/login?action=post',
                method: 'post',
                data: {
                    username: username,
                    password: md5password,
                    cgi_type: 1
                }
            }).then(res => {
                var jsonData = res.data;
                if (jsonData.result == "success") {
                    let data = jsonData.data;
                    if (self.loginSuccessResponseDataValid(data)) {
                        // 登陆成功
                        // this.global_.lset("username", data.username);
                        // 缓存登陆用户详情

                        // store.dispatch('user/setUserInfo', {
                        //     'userId': data.user_id,
                        //     'name': data.username,
                        //     'role': data.role,
                        //     'roleType': data.role_type,
                        //     'lastLoginTime': data.lastlogintime
                        // });
                        store.dispatch('user/setUserInfoWithCallback', {
                            'userId': data.user_id,
                            'name': data.username,
                            'role': data.role,
                            'roleType': data.role_type,
                            'lastLoginTime': data.lastlogintime
                        }).then(res => {
                            console.log('设置用户成功 :>> ');
                        }).catch(error => {
                            console.log('设置用户失败 :>> ');
                        });

                        console.log('api: 登陆成功');
                        resolve();
                    } else {
                        console.log('api: 登录失败');
                        reject("登陆失败")
                    }
                } else {
                    reject(jsonData.errmsg)
                }
            })
        });
    },

    /**
     * @description: 用户注销
     * @param {type} 
     * @return {type} 
     */
    userLogout() {
        console.log("api: 开始登出...");
        return new Promise((resolve, reject) => {
            return http({
                url: '/Web/WaterAffairs/login_out?action=delete',
                method: 'get'
            }).then(res => {
                let json = res.data;

                console.log("api: 登出结束 >> ", json);
                if (json.result == "success") {
                    store.dispatch('user/invalidUserAttr').then(() => {
                        resolve(json);
                    });
                } else {
                    reject(json.errmsg)
                }
            })
        });
    }
}