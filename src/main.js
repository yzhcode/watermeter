/*
 * @Author: yzh
 * @Date: 2020-09-03 10:05:52
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/** 弹出框 */
// import { Alert, Confirm, Toast, Loading } from 'wc-messagebox';
// Vue.use(Toast, {
//     location: 'center' //  默认在底部
// });
// Vue.use(Alert);
// Vue.use(Confirm);
// Vue.use(Loading);

/** 时间，日期格式化 */
import moment from 'moment';
moment.locale('zh-cn'); // 默认的语言环境为中文

import api from '@/network/api';
Vue.prototype.$api = api;
Vue.config.productionTip = false

// 参考地址 https://cenkai88.github.io/vue-svg-icon/demo/
import SvgIcon from 'vue-svg-icon/Icon.vue'
Vue.component('svg-icon', SvgIcon)

// import http from '@/network/http'
// Vue.use(http)

var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
