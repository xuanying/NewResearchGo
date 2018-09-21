import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/pages/HelloWorld'
import FindDirection from '@/components/pages/FindDirection'
import ReadPaper from '@/components/pages/ReadPaper'
import Loginwindow from '@/components/common/Signin_login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'Main',component: HelloWorld,meta: {requiresAuth: true}},
    {path:'/findDirection',name:'FindDirection',component:FindDirection,meta: {requiresAuth: true}},
    {path:'/readPaper',name:'ReadPaper',component:ReadPaper},
    {path:'/login',name:'Login',component:Loginwindow}
  ]
})
