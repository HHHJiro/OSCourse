import Vue from 'vue'
import Router from 'vue-router'
import gctn from '@/components/gctn'
import doc from '@/components/mdoc'
import video from '@/components/mvdo'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'gctn',
    component: gctn
  },
  {
    path: '/doc',
    name: 'doc',
    component: doc
  },
  {
    path: '/video',
    name: 'video',
    component: video
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
