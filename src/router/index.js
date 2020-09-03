/*
 * @Author: yzh
 * @Date: 2020-08-28 16:10:30
 * @Description: file content
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

import Layout from '@/layout'

const pathLogin = '/login';
const pathAbout = '/about';
const path404 = '/404'

let permission_routes = getCurrentUserPermissionRoutes();

/***************************** 路由配置 ******************************/
const routes = [{
        path: '/',
        name: 'Home',
        hidden: true,
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: 'Home',
            icon: 'el-icon-s-help'
        },
    },
    {
        path: pathAbout,
        name: 'About',
        hidden: true,

        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: 'About',
            icon: 'el-icon-s-help'
        },
    },
    {
        path: pathLogin,
        name: 'Login',
        hidden: true,
        component: () => import( /* webpackChunkName: "about" */ '@/views/login/index.vue'),
        meta: {
            title: 'Login',
            icon: 'el-icon-s-help'
        },
    },
    {
        path: path404,
        name: '404',
        component: Layout,
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: '页面没找到'
        },
    },
    {
        path: '/menu_c',
        component: Layout,
        redirect: '/menu_c_1',
        name: 'Example',
        meta: {
            title: 'Example',
            icon: 'el-icon-s-help',
            roles: [1, 2]
        },
        children: [{
                path: '/menu_c_1',
                name: 'menu_c_1',
                component: () => import('@/views/templates/t_menu_c_1'),
                meta: {
                    title: 'Table',
                    icon: 'table',
                    roles: [1],
                }
            },
            {
                path: '/menu_c_2',
                name: 'menu_c_2',
                component: () => import('@/views/templates/t_menu_c_2'),
                meta: {
                    title: 'Tree',
                    icon: 'tree',
                    roles: [1]
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
/***************************** 对外或者内部使用的接口 ******************************/


/**
 * @description: 获取显示的路由表
 * @param {type} 
 * @return {type} 
 */
export function getDisplayRoutes(routes) {
    const res = []

    routes.forEach(route => {
        const tmp = {
            ...route
        }

        if (tmp.children) { // 有子项的，判断所有子项目，只要有一个不隐藏就可以了
            tmp.children = getDisplayRoutes(tmp.children);
            if ((tmp.children instanceof Array) && (tmp.length > 0)) { // children全部合法
                res.push(tmp);
            }
        } else { // 没有子项的，判断自身是否合法
            if (!tmp.hidden) {
                res.push(tmp)
            }
        }
    })

    return res
}



/**
 * @description: 访问首页时应该重定向到某个页面，这里固定重定向到第一个路由
 * @param {type} 
 * @return {type} 
 */
function getRedirectRoot() {
    // 这里不能返回'/',否则会导致死循环
    return permission_routes[0].path;
}

/**
 * @description: 对不存在的路由，需要重定向到其他页面，暂时统一到404页面
 * @param {type} 
 * @return {type} 
 */
function getRedirectNotExistRoute() {
    return path404;
}


/**
 * @description: 是否存在此路由
 * @param {type} 
 * @return {type} 
 */
function isExistRoute(path) {
    return isExistRouteOfRoutes(permission_routes, path);
}

function isExistRouteOfRoutes(routes, path) {
    console.log('isExistRouteOfRoutes path :>> ', path);
    console.log('isExistRouteOfRoutes routes :>> ', routes);
    for (let index in routes) {
        let route = routes[index];
        if (route.path === path) {
            return true;
        } else if (route.children) {
            if (isExistRouteOfRoutes(route.children, path)) {
                return true;
            }
        }
    }
    return false;
}

/**
 * @description: 获取合法的路由配置
 * @param {role: 用户角色} 
 * @return {合法路由配置} 
 */



export function getCurrentUserPermissionRoutes() {
    return store.state.user.routes;
}

export function getPermissionRoutes(role) {
    return filterNoPermissionRoutes(routes, role);
}

function filterNoPermissionRoutes(routes, role) {
    const res = []

    routes.forEach(route => {
        const tmp = {
            ...route
        }

        if (tmp.children) { // 有子项的，判断所有子项目，只要有一个合法就可以了
            tmp.children = filterNoPermissionRoutes(tmp.children, role);
            if ((tmp.children instanceof Array) && (tmp.children.length > 0)) { // children全部合法
                res.push(tmp);
                // 重定向子项目被过滤掉了怎么办，在这里要检查一遍，如果没了，用第一项作为重定向项
                if (tmp.redirect) {
                    let firstNotHiddenItem = null;
                    let lastItem = null;
                    for (const item in tmp.children) {
                        if (item.path === tmp.redirect) { // 1、指定重定向到path还在，不变
                            break;
                        } else if (!item.hidden && !firstNotHiddenItem) {
                            firstNotHiddenItem = item;
                        } else {
                            lastItem = item;
                        }
                    }

                    if (firstNotHiddenItem) { // 2、指定重定向到path不在，使用第一个非隐藏路由
                        tmp.redirect = firstNotHiddenItem;
                    } else if (lastItem) { // 3、指定重定向到path不在，全都隐藏的，则用最后一个作为重定向
                        tmp.redirect = lastItem;
                    }
                }

            }
        } else { // 没有子项的，判断自身是否合法
            if (hasPermission(role, tmp)) {
                res.push(tmp);
            }
        }
    })

    return res
}

function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role)
    } else {
        return true
    }
}
export default router