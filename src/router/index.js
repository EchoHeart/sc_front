import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Home from "@/components/Home"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path: '/Home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location,onResolve,onReject){
//   if(onResolve || onReject)
//     return originalPush.call(this,location,onResolve,onReject)
//   return originalPush.call(this,location).catch(err => err)
// }
//
// // 挂载路由导航守卫
// router.beforeEach((to,from,next) =>{
//   /**
//    * to: 将要访问
//    * from: 从哪访问
//    * next: 下一步 next(url) 重定向到url上 若url为空，则继续访问to的路径
//    */
//   if(to.path == '/')
//     return next();
//   //取出当前登录用户
//   const userFlag = window.sessionStorage.getItem("user");
//   if(!userFlag)
//     return next("/");//无值则返回登录界面
//   next();//有值则放行
// })

export default router
