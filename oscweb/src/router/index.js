import Vue from 'vue'
import Router from 'vue-router'
import v2Gctn from '@/components/v2_gctn'
import doc from '@/components/mdoc'
import video from '@/components/mvdo'
import add from '@/components/add_res'
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
    path: '/video',
    name: 'video',
    component: video,
    children: [
       { path: ':vid', component: vdoView }
    ]
  },
  {
    path: '/add',
    component: add
  },
  {
    path: '/u/:id',
    component: resolve => require(['@/components/muser_page'], resolve)
  }
]

export default new Router({
  routes
})
