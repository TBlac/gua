// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
//引入element-ui
import ElementUI from "element-ui";
//引入element-ui的css
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import service from "./service";
// axios.defaults.baseURL = "/api"; //解决跨域问题
// import LogtoClient from '@logto/browser';

// const logtoClient = new LogtoClient({
//   endpoint: 'https://logto.qianqianplus.cn',
//   appId: 'yBVWn5WizHKVsgtEs6ow6',
// });


//使用ElementUI
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.service = service;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
