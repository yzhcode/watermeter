/*
 * @Author: yzh
 * @Date: 2020-08-25 14:26:49
 * @Description: 用户信息
 */

const state = {
    userId: 1,
    name:'',
    role:'',
    roleType:'',
    lastLoginTime:''
}

const STORE_USER_COMMIT_SUCCESS = null

const getter = {
    getUserInfo: (state) => (key) => {
        console.log('store get user :>> ', [key, state[key]]);
        return state[key];
    },
}

const mutations = {
    SET_USER_INFO: (state, config) => {
        // 遍历config，设置对应的值到state中
        // console.log('store set user config:>> ', config);
        for(let key in config){
            if (state.hasOwnProperty(key)) {
                let value = config[key];
                console.log('store set user :>> ', key, "==>", value)
                if (value) {
                    state[key] = value;
                }
            }
        }
    }
}

const actions = {
    /**
     * @description: 
     *      设置用户信息
     *      如果通过dispatch调用，是自动异步操作，页面上不知道什么时候完成，
     *      如果需要在完成或者错误时做响应，请使用带callback的接口
     * @param {type} 
     * @return {成功返回null， 错误返回对应字符串} 
     */
    setUserInfo({ commit, state }, config) {
        commit('SET_USER_INFO', config);
    },

    /**
     * @description: 
     *      带回调setUserInfo，完成或者发生错误时，外部可以做出响应，用法举例
     *      store.dispatch('user/setUserInfoWithCallback', config).then(res => {
                store设置完成
            });
     * @param {type} 
     * @return {type} 
     */
    setUserInfoWithCallback({ commit, state }, config) {
        return new Promise((resolve, reject) => {
            commit('SET_USER_INFO', config)
            resolve(config);
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}