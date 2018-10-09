import Vue from 'vue'
import Router from 'vue-router'
import Loginwindow from '@/components/common/Signin_login'
import HelloWorld from '@/components/pages/HelloWorld'
import FindDirection from '@/components/pages/FindDirection'
import ReadPaper from '@/components/pages/ReadPaper'
import ArticleDetail from '@/components/pages/ArticleDetail'
import Contribute from '@/components/pages/Contribute'
import KeywordDetail from '@/components/pages/KeywordDetail'
import JournaDetail from '@/components/pages/JournaDetail'
import OrgDetail from '@/components/pages/OrgDetail'
import Rank from '@/components/pages/Rank'
import FirstSignin from '@/components/pages/FirstSignin'
import PersonalDateEdit from '@/components/pages/PersonalDateEdit'
import AuthorHomePage from '@/components/pages/AuthorHomePage'
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
    {path:'/journaDetail',name:'JournaDetail',component:JournaDetail},
    {path:'/orgDetail',name:'OrgDetail',component:OrgDetail},
    {path:'/rank',name:'Rank',component:Rank},
    {path:'/firstSignin',name:'FirstSignin',component:FirstSignin},
    {path:'/personalDateEdit',name:'PersonalDateEdit',component:PersonalDateEdit},
    {path:'/authorHomePage',name:'AuthorHomePage',component:AuthorHomePage},
    {path:'/test',name:'Test',component:Test},
    
  ]
})
