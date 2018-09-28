import Vue from 'vue'
import Router from 'vue-router'
import Loginwindow from '@/components/common/Signin_login'
import HelloWorld from '@/components/pages/HelloWorld'
import FindDirection from '@/components/pages/FindDirection'
import ReadPaper from '@/components/pages/ReadPaper'
import ArticleDetail from '@/components/pages/ArticleDetail'
import Contribute from '@/components/pages/Contribute'
import KeywordDetail from '@/components/pages/KeywordDetail'
import Test from '@/components/pages/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Main',component: HelloWorld,meta: {requiresAuth: true}},
    {path:'/findDirection',name:'FindDirection',component:FindDirection,meta: {requiresAuth: true}},
    {path:'/readPaper',name:'ReadPaper',component:ReadPaper},
    {path:'/login',name:'Login',component:Loginwindow},
    {path:'/articleDetail',name:'ArticleDetail',component:ArticleDetail},
    {path:'/contribute',name:'Contribute',component:Contribute},
    {path:'/keywordDetail',name:'KeywordDetail',component:KeywordDetail},
    {path:'/test',name:'Test',component:Test}
  ]
})
