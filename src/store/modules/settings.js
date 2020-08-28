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
    // SET_THEME: (state, theme) => {
    //     state.theme = theme
    // },
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    // changeTheme({ commit, state }, theme) {
    //     commit('SET_THEME', theme)
    //     setTheme(theme);
    // },
    // changeThemeWithCallback({ commit, state }, theme) {
    //     return new Promise((resolve, reject) => {
    //         commit('SET_THEME', theme);
    //         setTheme(theme);
    //         resolve(config);
    //     });
    // },
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