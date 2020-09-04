<!--
 * @Author: yzh
 * @Date: 2020-08-28 18:02:07
 * @Description: file content
-->
<template>
    <div class="app-main ">
        <!-- <div class="main_container main_container_padding"> -->
        <transition name="fade-transform" mode="out-in">

            <router-view :key="key" />


        </transition>
    </div>
    <!-- </div> -->
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            key() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>
    .app-main {
        /*50 = navbar  */
        /* height: 100%; */
        /* width: 100%; */
        /* height: 100%; */
        position: relative;
        background: #F3F5F9;
        padding: 30px 30px 0;
        /* overflow-y: auto; */
        /* border: 2px solid #00f; */
    }

    /* .fixed-header+.app-main {
  padding-top: 50px;
} */
    .main_container {
        width: 100%;
        height: 100%;
    }

    /* .main_container_padding {
        padding: 30px 30px 0;
    } */
</style>

<style lang="scss">
    // fix css style bug in open el-dialog
    // .el-popup-parent--hidden {
    //   .fixed-header {
    //     padding-right: 15px;
    //   }
    // }
</style>
