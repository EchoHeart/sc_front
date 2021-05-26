import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入iconfont
import './assets/iconfont/iconfont.css'
//引入axios
import axios from 'axios'

//引入时间格式化moment
//require 方式
// require('moment/locale/zh-cn')
// moment.locale('zh-cn');
// //import 方式
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn');
//import 方式
import moment from "moment";
Vue.prototype.$moment = moment;

Vue.config.productionTip = false
Vue.use(ElementUI)
//挂载axios
Vue.prototype.$http = axios


//设置访问根路径
//！！！！！！！酌情更改
// axios.defaults.baseURL = "http://122.9.144.196:9000"
axios.defaults.baseURL = "http://localhost:9000"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
