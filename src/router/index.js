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
const permissionRoutes = {};// {role:[], role:[]}

/***************************** 路由配置 ******************************/
const allRoutes = [{
        path: '/',
        name: 'Home',
        hidden: true,
    },
    {
        path: '/',
        name: 'areaManager',
        hidden: true,
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: '区域管理',
            icon: 'menu-area'
        },
    },
    {
        path: pathAbout,
        name: 'About',
        // hidden: true,

        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: '关于',
            icon: 'menu-area'
        },
    },
    {
        path: pathLogin,
        name: 'login',
        // hidden: true,
        component: () => import( /* webpackChunkName: "about" */ '@/views/login/index.vue'),
        meta: {
            title: '登录',
            icon: 'menu-chart'
        },
    },
    {
        path: path404,
        name: path404,
        redirect: '/menu_d_1',
        component: Layout,
        showFirst: true,
        // meta: {
        //     title: path404,
        //     icon: 'menu-waterfactory',
        //     roles: [1],
        // },
        children: [{
            path: '/menu_d_1',
            name: 'menu_d_1',
            component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
            meta: {
                title: '唯一子菜单',
                icon: 'menu-waterfactory',
                roles: [1],
            }
        }
    ]
    },
    {
        path: '/menu_c',
        component: Layout,
        redirect: '/menu_c_1',
        name: 'Example',
        meta: {
            title: 'Example',
            icon: 'menu-waterfactory'
            // roles: [1, 2]
        },
        children: [{
                path: '/menu_c_1',
                name: 'menu_c_1',
                component: () => import('@/views/templates/t_menu_c_1'),
                meta: {
                    title: 'Table',
                    icon: 'menu-waterfactory',
                    roles: [2],
                }
            },
            {
                path: '/menu_c_2',
                name: 'menu_c_2',
                component: () => import('@/views/templates/t_menu_c_2'),
                meta: {
                    title: 'Tree',
                    icon: 'menu-watermeter',
                    roles: [1]
                }
            }
        ]
    }
]

function initRouter() {
    let routes = getPermissionRoutes(store.state.user.role);
    console.log('initRouter :>> ',routes);
    let router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        linkActiveClass: 'menvscode-active',
        scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
            //   console.log(to) // to：要进入的目标路由对象，到哪里去
            //   console.log(from) // from：离开的路由对象，哪里来
            //   console.log(savePosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
            if (savePosition) {
                return savePosition;
            } else {
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        routes: routes
    });

    return router;
}

const router = initRouter();

export function resetRouter() {
    console.log('resetRouter :>> ');
    const newRouter = initRouter();
    router.matcher = newRouter.matcher // reset router
}

/***************************** 路由导航守卫 ******************************/

router.afterEach((to, from, next) => {

});

const whiteList = [pathLogin, path404, pathAbout] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

    let role = store.state.user.role;
    console.log('beforeEach 角色 :>> ', role, '   路由将要to >> ', to.path);
    if (role) { // 已登录
        if (to.path === pathLogin ||
            to.path === '/') {
            next({
                path: getRedirectRoot()
            })
        }
    } else { // 未登录
        if (!whiteList.includes(to.path)) { // 没登录，又是白名单，则去登录
            next(`/login?redirect=${to.path}`)
        }
    }

    if (isExistRoute(to.path)) {
        console.log('路由最终to :>> ', to.path);
        next();
    } else {
        next({
            path: getRedirectNotExistRoute()
        })
    }

})

router.afterEach(() => {
    // finish progress bar
    // NProgress.done()
})

/***************************** 对外或者内部使用的接口 ******************************/


/**
 * @description: 获取显示的路由表
 * @param {type} 
 * @return {type} 
 */
export function getDisplayRoutes(role) {
    console.log('filterHiddenRoutes role :>> ', role);
    let routes = getPermissionRoutes(role);
    routes = filterHiddenRoutes(routes);
    return routes;
}

function filterHiddenRoutes(routes) {
    const res = []
    routes.forEach(route => {
        const tmp = {
            ...route
        }

        if (tmp.children) { // 有子项的，判断所有子项目，只要有一个不隐藏就可以了
            tmp.children = filterHiddenRoutes(tmp.children);
            if ((tmp.children instanceof Array) && (tmp.children.length > 0)) { // children全部合法
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
    switch (store.state.user.role) {
        case 1:
            return '/menu_c'
            break;
    
        default:
            return '/menu_c'
            break;
    }
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

function isExistRoute(path, routes=getPermissionRoutes(store.state.user.role)) {
    for (let index in routes) {
        let route = routes[index];
        if (route.path === path) {
            return true;
        } else if (route.children) {
            if (isExistRoute(path, route.children)) {
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


export function getPermissionRoutes(role) {
    
    let array = permissionRoutes[role];
    if (!(array instanceof Array && array.length > 0)) {
        array = filterNoPermissionRoutes(allRoutes, role);
        if (array instanceof Array && array.length > 0) {
            permissionRoutes[role] = array;
        }
    }
    
    console.log(role, ': permissionRoutes :>> ', array);
    return array;
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
                // console.log('tmp.redirect :>> ', tmp.redirect);
                if (tmp.redirect) {
                    let firstNotHiddenItem = null;
                    let lastItem = null;
                    for (const index in tmp.children) {
                        let item = tmp.children[index];
                        if (item.path === tmp.redirect) { // 1、指定重定向到path还在，不变
                            break;
                        } else if (!item.hidden && !firstNotHiddenItem) {
                            firstNotHiddenItem = item;
                        } else {
                            lastItem = item;
                        }
                    }

                    // console.log('firstNotHiddenItem :>> ', firstNotHiddenItem.path);
                    // console.log('lastItem :>> ', lastItem.path);

                    if (firstNotHiddenItem) { // 2、指定重定向到path不在，使用第一个非隐藏路由
                        tmp.redirect = firstNotHiddenItem;
                    } else if (lastItem) { // 3、指定重定向到path不在，全都隐藏的，则用最后一个作为重定向
                        console.log('lastItem :>> ', lastItem.path);
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

