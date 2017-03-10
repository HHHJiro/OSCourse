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
  { path: '/video', component:Video,
	 beforeEnter: (to, from, next) => {
        const token = sessionStorage.getItem('OS-Course-token');
          if(to.path == '/'){ // 如果是跳转到登录页的
		    if(token != 'null' && token != null){
		      next('/video') // 如果有token就转向todolist不返回登录页
		    }
		    next(); // 否则跳转回登录页
		  }else{
		    if(token != 'null' && token != null){
		      next() // 如果有token就正常转向
		    }else{
		      next('/login') // 否则跳转回登录页
		    }
		  }
      }},
  { path: '/comments', component:Comments},
  { path: '/login', component: Login},
  { path: '/test', component: Testlog}
]
// routes.beforeEach((to,from,next) =>{
//   const token = sessionStorage.getItem('OS-Course-token');
//   if(to.path == '/'){ // 如果是跳转到登录页的
//     if(token != 'null' && token != null){
//       next('/video') // 如果有token就转向todolist不返回登录页
//     }
//     next(); // 否则跳转回登录页
//   }else{
//     if(token != 'null' && token != null){
//       next() // 如果有token就正常转向
//     }else{
//       next('/login') // 否则跳转回登录页
//     }
//   }
// })

export default new Router({
	routes
})