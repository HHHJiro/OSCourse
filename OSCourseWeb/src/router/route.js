import Vue from 'vue'
import Router from 'vue-router'
import Default from '../components/default'
import Login from '../components/login'
import File from '../components/file'
import Video from '../components/video'
import Comments from '../components/comments'
import Testlog from '../components/testlog'
Vue.use(Router)
const routes = [
  { path: '/', component: Default },
  { path: '/file', component:File},
  { path: '/video', component:Video},
  { path: '/comments', component:Comments},
  { path: '/login', component: Login}
  // { path: '/test', component: Testlog}
]

export default new Router({
	routes
})