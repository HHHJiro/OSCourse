import Vue from 'vue'
import Router from 'vue-router'
import v2Gctn from '@/components/v2_gctn'
import doc from '@/components/mdoc'
import video from '@/components/mvdo'
import add from '@/components/v2_madd'
// import add from '@/components/add_res'
// import addVdo from '@/components/add_vdo'
import vdoView from '@/components/vdo_view'
import docView from '@/components/doc_view'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'gctn',
    component: v2Gctn
  },
  {
    path: '/doc',
    name: 'doc',
    component: doc,
    children: [
       { path: ':did', component: docView }
    ]
  },
  {
    path: '/vdo',
    name: 'video',
    component: video,
    children: [
        { path: 'video', component: resolve => require(['@/components/mvdo_list'], resolve) },
        { path: 'micro', component: resolve => require(['@/components/mvdo_list'], resolve) }
    ]
  },
  {
    path: '/video/:id',
    component: vdoView
  },
  {
    path: '/res/add',
    component: add,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:id',
    component: resolve => require(['@/components/muser_page'], resolve)
  },
  {
    path: '/teach',
    component: resolve => require(['@/components/mvdo_list'], resolve)
  }
]
const router = new Router({routes})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!window.localStorage.getItem('osc-access-token')) {
      next({
        path: '/'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router

