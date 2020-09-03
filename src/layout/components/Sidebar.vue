<!--
 * @Author: yzh
 * @Date: 2020-08-28 18:05:30
 * @Description: file content
-->
<template>
    <div>
        <div class="side-bar">
            <el-menu :default-active="$route.path" router>
                <template v-for="(route, index) in routes">
                    <el-menu-item v-if="!route.children || route.children.length === 0" :key="route.path"
                        :index="route.path">
                        <svg-icon :icon-class="route.meta.icon" class="mr15 f22"></svg-icon>
                        {{route.meta.title}}
                    </el-menu-item>
                    <el-submenu v-else :index="index.toString()" :key="route.path">
                        <template slot="title">
                            <svg-icon :icon-class="route.meta.icon" class="mr15 f22"></svg-icon>
                            {{route.meta.title}}
                        </template>

                        <el-menu-item-group>
                            <template v-for="subroute in route.children">
                                <el-menu-item v-if="!subroute.children || subroute.children.length === 0"
                                    :key="subroute.path" :index="subroute.path">
                                    <svg-icon :icon-class="subroute.meta.icon" class="mr15 f22"></svg-icon>
                                    {{subroute.meta.title}}
                                </el-menu-item>
                            </template>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>
<script>
    // import {
    //     getDisplayRoutes
    // } from '@/router'
    export default {
        name: 'Sidebar',
        data() {
            return {
                // userRole: this.$store.state.user.role, //账号角色
                // roleType: this.$store.getters["siteConfig/renderRoleType"], //角色类型
                // isNeedPadding: false,
            }
        },
        components: {},
        // watch: {
        //     userRole(newVal, oldVal) {

        //     }
        // },
        computed: {
            userRole() {
                return this.$store.state.user.role;
            },
            routes() {
                let premission_routes = this.$store.state.user.routes;
                let routes = [];//getDisplayRoutes(premission_routes);
                return routes;
            },
        },
        watch: {
            // '$route'(route) { //监听路由变化
            //     if (route.path === '/wholeMap') {
            //         this.isNeedPadding = true;
            //     } else {
            //         this.isNeedPadding = false;
            //     }
            // },
        },
        filters: {

        },
        mounted() {
            // if (this.$route.path === '/wholeMap') {
            //     this.isNeedPadding = true;
            // } else {
            //     this.isNeedPadding = false;
            // }

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    // @import "~@/assets/styles/common.css";
    .side-bar {
        width: 100%;
        // margin-left: 15px !important;
        // bottom: 0;
        // position: fixed;
        // z-index: 1020!important;
        transition: transform 0.3s;
        overflow-x: hidden;
        background-color: blueviolet;
        /*overflow: auto;*/
    }

    .sidebar-x-a {
        transform: translateX(-15.714286rem);
    }
</style>