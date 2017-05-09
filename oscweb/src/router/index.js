import Vue from 'vue'
import Router from 'vue-router'
import gctn from '@/components/gctn'
import doc from '@/components/mdoc'
import video from '@/components/mvdo'
import add from '@/components/add'
// import addVdo from '@/components/add_vdo'

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
  },
  {
    path: '/add',
    component: add
  }
]
export default new Router({
  routes
})
