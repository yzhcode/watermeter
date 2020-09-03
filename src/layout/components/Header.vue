<template>
    <div class="header">
        <div class="title-container">
            <span>xxxxxx</span>
            <span>yyyyyyy</span>
        </div>
        <div class="user-operate-container">
            <span>{{userName}}</span>
            <span class="operate-set">正常情况消失</span>
            <div class="operate-container">
                <span>yyyyyyy</span>
                <span>xxxxxx</span>
                <span>yyyyyyy</span>
                <span>xxxxxx</span>
                <span>yyyyyyy</span>
                <span>xxxxxx</span>
                <span>yyyyyyy</span>
                <span>xxxxxx</span>
                <span>yyyyyyy</span>
            </div>

        </div>
    </div>
</template>
<script>
    import {
        themeList
    } from '@/assets/theme/setTheme.js';
    export default {
        // inject : ['reload'],
        name: 'Header',
        data() {
            return {
                dialogThemeVisible: false,
                // themeV               : 'default',
                options: themeList,
                headerShowFlag: false,
                waterId: "",
            }
        },
        props: {},
        watch: {
            $route(to, from) {
                if (to.name == "login") {
                    this.headerShowFlag = false;
                } else {
                    this.headerShowFlag = true;
                }
            },
            waterId(newVal, oldVal) {
                this.handleSelect();
            },
        },
        computed: {
            userRole() {
                return this.$store.state.user.role;
            },
            /**
             * [站点名称]
             * @return {[type]} [description]
             */
            siteName() {
                return this.$store.state.user.name;
            },
            /**
             * [登陆用户名]
             * @return {[type]} [description]
             */
            userName() {
                return this.$store.state.user.name;
            },
            // 是否全屏
            fScreen() {
                return this.$store.getters['siteConfig/renderFullScreen'];
            },
            // 当前路由地址
            toName: function () {
                let tn = this.$store.getters['siteConfig/renderToName'],
                    flag = (tn == 'wholeMap' || tn == 'index') ? true : false;

                if (!flag) {
                    this.shrink();
                }

                return flag;
            },
            //当前水站数量
            waterStationNum() {
                let waterStation = this.$store.getters['siteConfig/renderWaterData'];
                return waterStation.length;
            },
            themeV: {
                get() {
                    return this.$store.state.settings.theme;
                },
                set(value) {
                    this.$store.dispatch('settings/changeSetting', {
                        'theme': value
                    });
                }
            }
        },
        mounted() {
            this.themeV = this.themeV;
        },
        methods: {

            gotoHome() {
                this.$store.dispatch('siteConfig/invokeCurWaterLine', 0);
                let path = this.$store.getters['siteConfig/renderWholePath'];
                if (path != null) {
                    this.$router.push({
                        name: path
                    });
                } else {
                    this.$router.push({
                        name: "wholeMap"
                    });
                }
            },
            loginOut() {
                try {
                    this.$fetch({
                        url: "/Web/WaterAffairs/login_out?action=delete",
                        method: "get"
                    }).then(result => {
                        let json = result.data;
                        if (json.result == "success") {
                            this.global_.removeLoginInfo();
                            this.$router.replace({
                                name: "login"
                            });
                        }
                    }).finally(() => {
                        // this.$loading.hide();
                    });
                } catch (e) {
                    this.global_.showToastErrmsg("退出登陆 请求失败");
                    console.log("getAreaList: " + e);
                };
            },
            fullScreen() {
                this.$store.dispatch('siteConfig/invokeFullScreen', true);
            },
            shrink() {
                this.$store.dispatch('siteConfig/invokeFullScreen', false);
            },
            handleSelect() {
                if (this.userRole == 3 && this.waterStationNum > 1 && this.waterId > 0) {
                    let tn = this.$store.getters['siteConfig/renderToName'];
                    this.$router.replace({
                        name: tn,
                        query: {
                            'sid': this.waterId
                        }
                    });
                    // this.reload();
                }
            },
            changeTheme(d) {
                this.dialogThemeVisible = false;
                this.$store.dispatch('ChangeTheme', d)
            },
        },
    }
</script>

<style scoped lang="scss">
    .header {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            span {
                margin-left: 10px;
            }
        }

        .user-operate-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            span {
                margin-right: 10px;
            }

            .operate-set {
                display: none;
            }

            .operate-container {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }
        }
    }

    .head-all {
        width: 100%;
        position: fixed;
        z-index: 3;
        transition: all 0.2s;
    }

    .navbar {
        height: 5.714286rem;
        padding: 1.428571rem;
    }

    .navbar-logo {
        width: 220px;
        line-height: 0;
        color: #21252B;
        font-size: 1.428571rem;
        font-weight: bolder;

        img {
            width: 100%;
        }
    }

    .title-weight {
        font-weight: bolder;
    }

    .text-color {
        color: #21252B;
    }

    .full-screen-shrink {
        transition: all 0.3s;
        transform: translateY(-100px);
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
            font-size: 1.3rem;
        }
    }

    .f-s-ty {
        transform: translateY(0);
    }

    .navbar-nav {
        >li {
            position: relative;
            line-height: 54px;
            font-size: 16px;
            padding: 0 15px;
            margin-left: 2px;

            i {
                font-size: 1.2rem;
            }
        }
    }

    .header_water_select {
        margin-left: 65px;
    }

    .navbar-toggle {
        text-align: center;
        background-color: #fff;
    }

    .navbar-toggle span {
        display: block;
        width: 20px;
        margin: 6px 0;
        border-bottom: 2px solid #6c757d;
    }

    .navbar-collapse {
        height: auto;
        right: 0;
        position: fixed;
    }

    .navbar-title {
        margin: 0 auto;
    }

    @media screen and (min-width:768px) {
        .title-small {
            display: none;
        }

        .title-large {
            display: block;
        }

        .full-screen-shrink {
            right: 14px;
            width: 48px;
            height: 48px;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 24px;

            i {
                color: #fff;
            }
        }
    }

    @media screen and (max-width: 767px) {
        .title-small {
            display: block;
        }

        .title-large {
            display: none;
        }

        .navbar-collapse {
            top: 5.714286rem;
            width: 12.714286rem;
            background-color: #EEEEEE;
        }

        .navbar-collapse li {
            width: 100%;
            text-align: left;
        }

        .collapse:not(.show) {
            display: none !important;
        }

        .full-screen-shrink {
            i {
                color: #6c757d;
            }
        }
    }
</style>
