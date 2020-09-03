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
import { storeSetUserRoleCallback } from '@/utils/storeCallback.js'
    export default {
        // mounted() {
            // console.log('调试语句 设置皮肤为默认，后期需要改成读取当前，然后设置一遍2');
            // let theme = this.$store.state.settings.theme;
            // if (!(theme instanceof String && theme.length > 0)) {
            //     theme = 'default';
            // }

            // let role = this.$store.state.user.role;
            // console.log('theme-->', theme, ', role-->', role);
            // this.$store.dispatch('settings/changeSetting', {
            //     'theme': theme
            // });
      
            // this.$store.dispatch('user/setUserInfoWithCallback', {
            //     'role': role
            // }).then(res => {
            //     storeSetUserRoleCallback(role);
            // }).catch(error => {
            //     console.log('设置user role信息失败:', error);
            // });
        // },
    }
</script>

<style>
    #app {
        color: #2c3e50;
        height: 100%;
    }
</style>
