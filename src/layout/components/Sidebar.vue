<template>
    <div>
        <div :class="['side-bar', fScreen?'sidebar-x-a':'']">
            <el-menu v-if="userRole=='1'" :default-active="$route.path" router>
                <el-menu-item index="/areaManage">
                    <svg-icon icon-class="firefox" class="mr15 f22"></svg-icon>
                    区域管理
                </el-menu-item>
                <el-menu-item index="/wholeManage">
                    <svg-icon icon-class="menu-smart" class="mr15 f22"></svg-icon>
                    水站管理
                </el-menu-item>
                <el-menu-item index="/regionAccountManager">
                    <svg-icon icon-class="user" class="mr15 f22"></svg-icon>
                    区域账号管理
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <svg-icon icon-class="menu-device" class="mr15 f22"></svg-icon>
                        设备管理
                    </template>

                    <el-menu-item-group>
                        <el-menu-item class="ml15" index="/device/cloudBox">云盒子</el-menu-item>
                        <el-menu-item class="ml15" index="/videoManage">摄像头</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-menu-item index="/monitorLocation">
                    <svg-icon icon-class="menu-whole" class="mr15 f22"></svg-icon>
                    应用管理
                </el-menu-item>
            </el-menu>
            <el-menu v-if="userRole=='2'" :default-active="$route.path" router>
                <el-menu-item index="/wholeMap">
                    <svg-icon icon-class="menu-map" class="mr15 f22"></svg-icon>
                    水站地图
                </el-menu-item>

                <el-submenu index="1">
                    <template slot="title">
                        <svg-icon icon-class="menu-smart" class="mr15 f22"></svg-icon>
                        实时监控
                    </template>

                    <el-menu-item-group>
                        <el-menu-item class="ml15" index="/wholeDataMonitoring">水站监控</el-menu-item>
                        <el-menu-item class="ml15" index="/wholeVideoMonitoring">实时视频</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <svg-icon icon-class="menu-statistics" class="mr15 f22"></svg-icon>
                        数据分析
                    </template>

                    <el-menu-item-group>
                        <el-menu-item class="ml15" index="/wholeAlarmLog">报警日志</el-menu-item>
                        <el-menu-item class="ml15" index="/wholeStatisticsTrend">历史数据</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <svg-icon icon-class="menu-whole" class="mr15 f22"></svg-icon>
                        工单管理
                    </template>

                    <el-menu-item-group>
                        <el-menu-item class="ml15" index="/wholeWorkOrderManager">工单派发</el-menu-item>
                        <el-menu-item class="ml15" index="/wholeWorkOrderHis">工单状态</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4" v-if="roleType=='2'">
                    <template slot="title">
                        <svg-icon icon-class="menu-device" class="mr15 f22"></svg-icon>
                        设备管理
                    </template>

                    <el-menu-item-group>
                        <el-menu-item class="ml15" index="/device/cloudBox">云盒子</el-menu-item>
                        <el-menu-item class="ml15" index="/videoManage">摄像头</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-menu-item index="/wholeAttendance">
                    <svg-icon icon-class="menu-account" class="mr15 f22"></svg-icon>
                    巡查统计
                </el-menu-item>

                <el-submenu index="5">
                    <template slot="title">
                        <svg-icon icon-class="menu-set" class="mr15 f22"></svg-icon>
                        系统管理
                    </template>

                    <el-menu-item-group>
                        <el-menu-item class="ml15" index="/wholeManage">水站管理</el-menu-item>
                        <el-menu-item class="ml15" index="/wholeAccount">账号管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </div>
        <div class="main">
            <div :class="['main-position', fScreen?'map-full-screen':'']">
                <div :class="['main-container', fScreen?'map-full-p0':'',isNeedPadding?'':'main_container_padding']">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userRole: 1, //账号角色
                roleType: this.$store.getters["siteConfig/renderRoleType"], //角色类型
                isNeedPadding: false,
            }
        },
        components: {},
        computed: {
            // 是否全屏
            fScreen: function () {
                return this.$store.getters['siteConfig/renderFullScreen'];
            }
        },
        watch: {
            '$route'(route) { //监听路由变化
                if (route.path === '/wholeMap') {
                    this.isNeedPadding = true;
                } else {
                    this.isNeedPadding = false;
                }
            },
        },
        mounted() {
            if (this.$route.path === '/wholeMap') {
                this.isNeedPadding = true;
            } else {
                this.isNeedPadding = false;
            }
        },
        methods: {}
    }
</script>

<style lang="less" scoped>

</style>