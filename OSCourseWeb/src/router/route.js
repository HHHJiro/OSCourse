import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '../components/default'
import Login from '../components/login'
import File from '../components/file'
import Video from '../components/video'
import Comments from '../components/comments'
import Testlog from '../components/testlog'

const routes = [
  { path: '/', component: Default },
  { path: '/file', component:File},
  { path: '/video', component:Video},
  { path: '/comments', component:Comments},
  { path: '/login', component: Login}
  // { path: '/test', component: Testlog}
]

var router = new VueRouter({
    routes: routes
});

export {
    router
}