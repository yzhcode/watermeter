/*
 * @Author: yzh
 * @Date: 2020-08-25 14:27:13
 * @Description: 网站设置信息
 */
import {
    setTheme,
    defaultTheme,
} from '@/assets/theme/setTheme.js'

const state = {
    theme: defaultTheme,
    showSettings: true,
    fixedHeader: false,
    sidebarLogo: false
}

const getter = {
    // getTheme(state) {
    //     return state.theme;
    // },
    getSetting(state, key) {
        return state[key];
    }
}

const mutations = {
    CHANGE_SETTING: (state, config) => {
        for(let key in config){
            if (state.hasOwnProperty(key)) {
                let value = config[key];
                state[key] = value
                console.log('store setting :>> ', key, '--', value);
                if (key === 'theme') {
                    setTheme(value);
                }
            }
        }
    }
}

const actions = {
    changeSetting({ commit, state }, config) {
        commit('CHANGE_SETTING', config)
    },
    changeSettingWithCallback({ commit, state }, config) {
        return new Promise((resolve, reject) => {
            commit('CHANGE_SETTING', config);
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