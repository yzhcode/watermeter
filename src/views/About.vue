<!--
 * @Author: yzh
 * @Date: 2020-08-24 17:41:36
 * @Description: file content
-->
<template>
    <div class="about">
        <h1>This is an about page===={{userId}}======{{nuserid}}</h1>
        <input v-model="userId">
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'About',
        data() {
            return {
                nuserid: 0
            }
        },
        components: {

        },
        computed: {
            userId: {
                get() {
                    return this.$store.state.user.userId
                },
                set(value) {
                    this.$store.dispatch('user/setUserInfo', {
                        "userId": value
                    });
                    this.$api.userLogin('成总', '123456').then(res => {
                        console.log('页面 :>> ', '登录成功2');
                    }).catch(error => {
                        console.log('页面 :>> ', '登录失败2');
                    });

                    // this.$userapi.userLogin('成总', '123456').then(() => {
                    //     console.log('页面 :>> ', '登录成功');
                    // }).catch((error) => {
                    //     console.log('页面 :>> ', '登录失败');
                    // })
                }
            }
        },
        methods: {
            getNUserId() {
                console.log('======= :>> ');
                this.nuserid = this.userId
            }
        }
    }
</script>