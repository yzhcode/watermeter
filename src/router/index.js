/*
 * @Author: yzh
 * @Date: 2020-08-28 16:10:30
 * @Description: file content
 */



/**
还有3个问题: 
1、跳转路由时会报错
2、路由配置里，子路由要写全路径
3、svg-icon 图太小了
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 路由跳转时会报错，这里截获错误
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {

//     let err = originalPush.call(this, location).catch(err => err)
//     console.log('route error :>> ', err);
//     return err;
// }

import MainLayout from '@/layout/mainlayout'
import SubLayout from '@/layout/sublayout'

const pathLogin = '/login';
const pathAbout = '/about';
const path404 = '/404'
const permissionRoutes = {}; // {role:[], role:[]}

/***************************** 路由配置 ******************************/

// 左侧菜单显示到路由
const mainLayoutRoutes = [{
        path: '/menu1',
        name: 'menu1',
        // hidden: true,

        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: '菜单1',
            icon: 'menu-waterfactory'
        }
    },
    {
        path: '/menu2',
        name: 'menu2',
        // hidden: true,
        component: () => import( /* webpackChunkName: "about" */ '@/views/login/index.vue'),
        meta: {
            title: '菜单2',
            icon: 'menu-waterfactory'
        }
    },
    {
        path: '/menu3',
        name: 'menu3',
        // hidden: true,
        component: SubLayout,
        meta: {
            title: '菜单3',
            icon: 'menu-waterfactory'
        },
        children: [{
                path: '/menu3/submenu1',
                name: 'menu3submenu1',
                // hidden: true,

                component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
                meta: {
                    title: '3-子菜单1',
                    icon: 'menu-waterfactory'
                }
            },
            {
                path: '/menu3/submenu2',
                name: 'menu3submenu2',
                // hidden: true,
                component: () => import( /* webpackChunkName: "about" */ '@/views/login/index.vue'),
                meta: {
                    title: '3-子菜单2',
                    icon: 'menu-waterfactory'
                }
            }
        ]
    },
    {
        path: '/menu4',
        name: 'menu4',
        // hidden: true,
        component: SubLayout,
        meta: {
            title: '菜单4',
            icon: 'menu-waterfactory'
        },
        children: [{
                path: '/menu4/submenu1',
                name: 'menu4submenu1',
                // hidden: true,

                component: () => import('@/views/templates/t_menu_c_1'),
                meta: {
                    title: '4-子菜单1',
                    icon: 'menu-waterfactory'
                }
            },
            {
                path: '/menu4/submenu2',
                name: 'menu4submenu2',
                // hidden: true,
                component: () => import('@/views/templates/t_menu_c_2'),
                meta: {
                    title: '4-子菜单2',
                    icon: 'menu-waterfactory'
                }
            }
        ]
    }
];

// 满屏的路由，比如首页(一般用来重定向的)，登录页，404页 和MainLayout
const allRoutes = [{
        path: '/',
        name: 'Home',
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: '首页',
            icon: 'menu-waterfactory'
        }
    },
    {
        path: pathLogin,
        name: 'login',
        component: () => import( /* webpackChunkName: "about" */ '@/views/login/index.vue'),
        meta: {
            title: '登录',
            icon: 'menu-waterfactory'
        }
    },
    {
        path: path404,
        name: 'About',
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: '页面不存在',
            icon: 'menu-waterfactory'
        }
    },
    {
        path: '/MainLayout',
        name: '主路由',
        component: MainLayout,
        meta: {
            title: '主路由',
            icon: 'menu-waterfactory'
        },
        children: mainLayoutRoutes
    }
];

function initRouter() {
    let routes = getPermissionRoutes(store.state.user.role);
    console.log('initRouter :>> ', routes);
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
    next();
    return;
    let role = store.state.user.role;
    console.log('beforeEach 角色 :>> ', role, '   路由将要to >> ', to.path);
    if (role) { // 已登录
        if (to.path === pathLogin) {
            console.log('路由最终to :>> ', to.path);
            next();
        } else if (to.path === '/') {
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
    let routes = filterRoutes(mainLayoutRoutes, role, true);
    console.log('DisplayRoutes role :>> ', role, 'route: ', routes);
    return routes;
}

// function filterHiddenRoutes(routes) {
//     const res = []
//     routes.forEach(route => {
//         const tmp = {
//             ...route
//         }

//         if (tmp.children) { // 有子项的，判断所有子项目，只要有一个不隐藏就可以了
//             tmp.children = filterHiddenRoutes(tmp.children);
//             if ((tmp.children instanceof Array) && (tmp.children.length > 0)) { // children全部合法
//                 res.push(tmp);
//             }
//         } else { // 没有子项的，判断自身是否合法
//             if (!tmp.hidden) {
//                 res.push(tmp)
//             }
//         }
//     })

//     return res
// }

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

function isExistRoute(path, routes = getPermissionRoutes(store.state.user.role)) {
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
        array = filterRoutes(allRoutes, role, false);
        if (array instanceof Array && array.length > 0) {
            permissionRoutes[role] = array;
        }
        console.log(role, ': permissionRoutes :>> ', array);
    }
    
    return array;
}

function filterRoutes(routes, role, nohidden) {
    const res = []
    // console.log('filterRoutes :>> role: ', role, 'nohidden: ', nohidden, 'routes: ', routes);
    routes.forEach(route => {
        const tmp = {
            ...route
        }

        if (tmp.children) { // 有子项的，判断所有子项目，只要有一个合法就可以了
            tmp.children = filterRoutes(tmp.children, role, nohidden);
            if ((tmp.children instanceof Array) && (tmp.children.length > 0)) { // children全部合法
                res.push(tmp);
                // 重定向子项目被过滤掉了怎么办，在这里要检查一遍，如果没了，用第一项作为重定向项
                // console.log('tmp.redirect :>> ', tmp.redirect);
                // if (tmp.redirect) {
                //     let firstNotHiddenItem = null;
                //     let lastItem = null;
                //     for (const index in tmp.children) {
                //         let item = tmp.children[index];
                //         if (item.path === tmp.redirect) { // 1、指定重定向到path还在，不变
                //             break;
                //         } else if (!item.hidden && !firstNotHiddenItem) {
                //             firstNotHiddenItem = item;
                //         } else {
                //             lastItem = item;
                //         }
                //     }

                //     // console.log('firstNotHiddenItem :>> ', firstNotHiddenItem.path);
                //     // console.log('lastItem :>> ', lastItem.path);

                //     if (firstNotHiddenItem) { // 2、指定重定向到path不在，使用第一个非隐藏路由
                //         tmp.redirect = firstNotHiddenItem;
                //     } else if (lastItem) { // 3、指定重定向到path不在，全都隐藏的，则用最后一个作为重定向
                //         console.log('lastItem :>> ', lastItem.path);
                //         tmp.redirect = lastItem;
                //     }
                // }

                replaceRouteRedirect(tmp);

            }
        } else { // 没有子项的，判断自身是否合法
            if (role && nohidden) {
                if (!tmp.hidden && hasPermission(role, tmp)) {
                    res.push(tmp);
                }
            } else if (role) {
                if (hasPermission(role, tmp)) {
                    res.push(tmp);
                }
            } else if (nohidden) {
                if (!tmp.hidden) {
                    res.push(tmp);
                }
            }
        }
    })

    return res
}

function replaceRouteRedirect(route) {
    if (!route.redirect) {
        return;
    }

    let firstNotHiddenItem = null;
    let lastItem = null;
    for (const index in route.children) {
        let item = route.children[index];
        if (item.path === route.redirect) { // 1、指定重定向到path还在，不变
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
        route.redirect = firstNotHiddenItem;
    } else if (lastItem) { // 3、指定重定向到path不在，全都隐藏的，则用最后一个作为重定向
        console.log('lastItem :>> ', lastItem.path);
        route.redirect = lastItem;
    }
}

function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role)
    } else {
        return true
    }
}
export default router