<!--
 * @Author: yzh
 * @Date: 2020-08-28 16:13:14
 * @Description: file content
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import {
        resetRouter
    } from '@/router'
    export default {
        mounted() {

        },
        beforeCreate() {

            let theme = this.$store.state.settings.theme;
            let role = this.$store.state.user.role;
            console.log('theme-->', theme, ', role-->', role);

            if (!(theme instanceof String && theme.length > 0)) {
                theme = 'default';
            }

            if (theme === 'dark') {
                console.log('重设一遍皮肤，以便触发皮肤切换');
                this.$store.dispatch('settings/changeSetting', {
                    'theme': theme
                });
            }

            console.log('重设一遍用户角色，以便触发各种根据权限动态显示到内容');
            this.$store.dispatch('user/setUserInfo', {
                'role': role
            }).then(res => {
                resetRouter();
            }).catch(error => {
                console.log('设置user role信息失败:', error);
            });
        }

        /* 生命周期 - 更新之前  */
    }
</script>

<style>
    #app {
        color: #2c3e50;
        height: 100%;
    }
</style>