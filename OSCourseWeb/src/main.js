import App from './App'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-default/index.css'

import {router} from './router/route'
Vue.use(ElementUI) 
Vue.use(VueRouter)
Vue.use(VueAxios,axios);
Vue.prototype.$http = axios
new Vue({
    mode: 'history',
    template: '<App/>',
    components: { App },
    router: router
}).$mount('#app')