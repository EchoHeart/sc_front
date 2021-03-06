import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Home from "@/components/Home"
import Welcome from "@/components/Welcome";
import UserManage from "@/components/UserManage";
import QualificationCheck from "@/components/QualificationCheck";
import ServiceManage from "@/components/ServiceManage";
import ServiceBuy from "@/components/ServiceBuy";
import ClassManage from "@/components/ClassManage";
import LessonManage from "@/components/LessonManage";
import QuestionBank from "@/components/QuestionBank";
import SchoolInfo from "@/components/SchoolInfo";
import EarthquakeInfo from "@/components/EarthquakeInfo";
import FireInfo from "@/components/FireInfo";
import LandslideInfo from "@/components/LandslideInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/Welcome',
    children: [
      {path: '/Welcome',name: 'Welcome',component: Welcome},
      {path: '/UserManage',name: 'UserManage',component: UserManage},
      {path: '/QualificationCheck',name: 'QualificationCheck',component: QualificationCheck},
      {path: '/ServiceManage',name: "ServiceManage",component: ServiceManage},
      {path: '/ServiceBuy',name: "ServiceBuy",component: ServiceBuy},
      {path: '/ClassManage',name: "ClassManage",component: ClassManage},
      {path: '/LessonManage',name: "LessonManage",component: LessonManage},
      {path: '/QuestionBank',name: "QuestionBank",component: QuestionBank},
      {path: '/SchoolInfo',name: "SchoolInfo",component: SchoolInfo},
      {path: '/EarthquakeInfo',name: "EarthquakeInfo",component: EarthquakeInfo},
      {path: '/FireInfo',name: "FireInfo",component: FireInfo},
      {path: '/LandslideInfo',name: "LandslideInfo",component: LandslideInfo}
    ]
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
// // ????????????????????????
// router.beforeEach((to,from,next) =>{
//   /**
//    * to: ????????????
//    * from: ????????????
//    * next: ????????? next(url) ????????????url??? ???url????????????????????????to?????????
//    */
//   if(to.path == '/')
//     return next();
//   //????????????????????????
//   const userFlag = window.sessionStorage.getItem("user");
//   if(!userFlag)
//     return next("/");//???????????????????????????
//   next();//???????????????
// })

export default router
