/*
 * @Author: yzh
 * @Date: 2020-09-03 08:48:12
 * @Description: 有些时候保存了store之后，需要自动做一些后续的事情，则在store的callback中调用此文件的接口
 */

import store from '@/store'
import {
    resetRouter,
    getPermissionRoutes
} from '@/router'

// import router from '@/router'

export function storeSetUserRoleCallback(role) {
    let routes = getPermissionRoutes(role);
    store.dispatch('user/setUserInfoWithCallback', {
        'routes': routes
    }).then(res => {
        resetRouter();
    }).catch(error => {
        console.log('设置路由信息失败 :>> ');
    });
}