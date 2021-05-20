import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Home from "@/components/Home"
import Welcome from "@/components/Welcome";
import UserManage from "@/components/UserManage";
import QualificationCheck from "@/components/QualificationCheck";
import ServiceManage from "@/components/ServiceManage";
import ServiceBuy from "@/components/ServiceBuy";
import LessonManage from "@/components/LessonManage";
import ClassManage from "@/components/ClassManage";

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
    children: [
      {path: '/Welcome',name: 'Welcome',component: Welcome},
      {path: '/UserManage',name: 'UserManage',component: UserManage},
      {path: '/QualificationCheck',name: 'QualificationCheck',component: QualificationCheck},
      {path: '/ServiceManage',name: "ServiceManage",component: ServiceManage},
      {path: '/ServiceBuy',name: "ServiceBuy",component: ServiceBuy},
      {path: '/LessonManage',name: "LessonManage", component: LessonManage},
      {path: '/ClassManage',name: "ClassManage", component: ClassManage}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
