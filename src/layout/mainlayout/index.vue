<!--
 * @Author: yzh
 * @Date: 2020-09-03 09:55:42
 * @Description: file content
-->
<template>
    <div class="layout">
        <div class="layout-fix-row layout-header">
            <layout-header></layout-header>
        </div>
        <div class="layout-fix-column layout-aside">
            <layout-menu></layout-menu>
        </div>
        <div class="layout-fix-column layout-router-container">
            <layout-router></layout-router>
        </div>
        <!-- <div class="layout-fix-column layout-ads">
            
        </div> -->
        <!-- <div class="layout-fix-row layout-footer">
           
        </div> -->
    </div>
</template>

<script>
    import LayoutMenu from './components/MainLayoutMenu'
    import LayoutRouter from './components/MainLayoutContainer'
    import LayoutHeader from './components/MainLayoutHeader'

    export default {
        name: 'MainLayout',
        components: {
            LayoutMenu,
            LayoutRouter,
            LayoutHeader
        }
    }

</script>

<style lang="scss" scoped>
    $sideBarWidth: 210px;
    $navbarHeight: 100px;
    
    .layout {
        height: 100%;
        .layout-fix-row {
            position: fixed;
            overflow-y: auto; // 外部框架自动滚动，内部高度自动
            z-index: 3;
            left:0;
            right:0;
            transition: all 0.2s;
            width: 100%;
        }

        .layout-header{
            height: $navbarHeight;
            top: 0;
            box-shadow: 0px 2px 4px 0px rgba(37, 130, 247, 0.2);
            z-index: 4;
            // border: 1px solid #f00;
        }

        .layout-footer {
            height: $navbarHeight;
            bottom: 0;
            // border: 1px solid #0f0;
        }

        .layout-fix-column {
            position: fixed;
            overflow-y: auto; // 外部框架自动滚动，内部高度自动
            z-index: 3;
            top: $navbarHeight;
            bottom: 0;
        }

        .layout-aside {
            left: 0;
            width: $sideBarWidth;
            z-index: 5;
            // border: 1px solid #00f;
        }

        .layout-ads {
            right: 0;
            width: $sideBarWidth;
            // border: 1px solid #f0f;
        }

        .layout-router-container{
            left: $sideBarWidth;
            right: 0;
            background: #F3F5F9;
            // min-height: 100%;
            // border: 1px solid #f0f;
        }
    }
</style>