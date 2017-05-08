import Vue from 'vue'
import Router from 'vue-router'
import gctn from '@/components/gctn'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'gctn',
    component: gctn
  }
]
// var router = new Router({
//   routes
// })
// router.beforeEach((to, from, next) => {
//   var a = true
//   if (a) {
//     next('/login')
//   } else {
//     next()
//   }
// })
export default new Router({
  routes
})
