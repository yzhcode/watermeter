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
                    <el-menu-item :index="route.path" v-if="!route.children || route.children.length === 0"
                        :key="route.path">
                        <svg-icon :name="route.meta.icon" :icon-class="route.meta.icon" class="mr15 f22"></svg-icon>
                        {{route.meta.title}}
                    </el-menu-item>

                    <el-submenu v-else :index="index.toString()" :key="route.path">
                        <template slot="title">
                            <svg-icon :name="route.meta.icon" class="mr15 f22"></svg-icon>
                            {{route.meta.title}}
                        </template>

                        <el-menu-item-group>
                            <template v-for="subroute in route.children">
                                <el-menu-item :index="subroute.path"
                                    v-if="!subroute.children || subroute.children.length === 0" :key="subroute.path">
                                    <svg-icon :name="subroute.meta.icon" class="mr15 f22"></svg-icon>
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
    import {
        getDisplayRoutes
    } from '@/router'
    export default {
        name: 'Sidebar',
        computed: {
            routes() {
                let role = this.$store.state.user.role;
                let routes = getDisplayRoutes(role);
                return routes;
            },
        }
    }
</script>

<style lang="scss" scoped>
    // @import "~@/assets/styles/common.css";
    .side-bar {
        width: 100%;
        transition: transform 0.3s;
        overflow-x: hidden;
        background-color: blueviolet;
        /*overflow: auto;*/
    }

    .sidebar-x-a {
        transform: translateX(-15.714286rem);
    }
</style>