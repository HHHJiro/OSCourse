// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from '@/App'
import Vue from 'vue'
import router from '@/router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import fun from '../static/js/fun'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.prototype.$echarts = echarts
Vue.prototype.fun = fun
Vue.filter('formDate', fun.formDate)
Vue.filter('formType', fun.formType)
Vue.filter('fileType', fun.fileType)
Vue.filter('formRole', fun.formRole)
Vue.filter('teamTitle', fun.teamTitle)
Vue.filter('formAllRole', fun.formAllRole)
axios.interceptors.request.use(function (req) {
  const AUTH_TOKEN = window.localStorage.getItem('osc-access-token')
  if (AUTH_TOKEN) {
    req.headers['osc-access-token'] = AUTH_TOKEN
  }
  // console.log(req.headers)
  return req
}, function (error) {
  console.log('here')
    // 对请求错误做些什么 返回失败
  return Promise.reject(error)
})

new Vue({
  mode: 'history',
  template: '<App/>',
  components: { App },
  router
}).$mount('#app')
