<!--
 * @Author: yzh
 * @Date: 2020-08-24 17:41:36
 * @Description: file content
-->
<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <span>====={{userId}}=====</span>
    </div>
</template>

<script>
    // @ is an alias to /src
  
    export default {
        name: 'Home',
        components: {
            
        },
        computed: {
            userId() {
                return this.$store.state.user.userId
            }
        }
    }
</script>