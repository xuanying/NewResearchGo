<template>
  <div class="main">
    <p @click="showWin()">show</p>
       <!-- <transition
       @before-enter="beforeEnter"
      @enter="enterLogin"
      @leave="leaveLogin"
    > -->
    <div id="window" :class="{'animationWin':loginWin}">
      <div class="page for_login" v-if="loginWin">

        <img @before-enter="delay" class="fadeIn delay5 img_x" src="../../assets/images/x.png" @click="hideLoginWin()">
        <div class="page-content">
          <!--<form id="form_login" action="/register/" method="post">-->
          <div class="input-row">
            <label class="label fadeIn">邮箱</label>
            <input id="logName" name="username" type="email" required="required" class="input fadeIn delay1" />
          </div>
          <div class="input-row">
            <label class="label fadeIn delay2">密码</label>
            <input id="logPsd" name="password" type="password" required="required" class="input fadeIn delay2" />
          </div>
          <!--<input id="state" name = 'state' value = 'login' type = 'hidden' />-->
          <div class="input-row">
            <label class="label fadeIn delay3">验证码</label>
            <input id="logcode_up" type="Verification" required="required" class="input fadeIn delay3" />
            <ul id="logcode_in" class="fadeIn delay4" title="看不清楚？点击更换">
              <span class="word_1" style="color: rgb(236, 214, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">H</span>
              <span class="word_2" style="color: rgb(50, 175, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">v</span>
              <span class="word_3" style="color: rgb(50, 125, 180); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">I</span>
              <span class="word_4" style="color: rgb(254, 96, 48); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">U</span>
            </ul>
          </div>
          <div class="input-row perspective">
            <button id="logsub" class="button fadeIn delay4"><span class="default">登录</span>
            </button>
            <label class="fadeIn delay5">还未注册？</label>
          </div>
          <!--</form>-->
        </div>
      </div>
       <!-- </transition> -->
      <div class="page for_signup" v-show="signinWin">
        <img class="fadeIn delay5 img_x" src="../../assets/images/x.png">
        <div class="page-content">
          <!--<form id="form_reg" action="/register/" method="post">-->
          <div class="input-row">
            <label class="label fadeIn">邮箱</label>
            <input id="signName" name="username" type="email" class="input fadeIn delay1" />
          </div>
          <div class="input-row">
            <label class="label fadeIn delay2">密码</label>
            <input id="signPsd" name="password" type="password" class="input fadeIn delay2" />
          </div>
          <div class="input-row">
            <label class="label fadeIn delay2">再次输入密码</label>
            <input id="repsd" type="password" class="input fadeIn delay2" />
          </div>
          <!--<input id="rstate" name = 'state' value = 'login' type = 'hidden' />-->
          <div class="input-row">
            <label class="label fadeIn delay3">验证码</label>
            <input id="signcode_up" type="Verification" class="input fadeIn delay3" />
            <ul id="signcode_in" class="fadeIn delay4" title="看不清楚？点击更换">
              <span class="word_1" style="color: rgb(236, 214, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">H</span>
              <span class="word_2" style="color: rgb(50, 175, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">v</span>
              <span class="word_3" style="color: rgb(50, 125, 180); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">I</span>
              <span class="word_4" style="color: rgb(254, 96, 48); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">U</span>
            </ul>
          </div>
          <div class="input-row perspective">
            <button id="signsub" class="button fadeIn delay4"><span class="default">注册</span>
            </button>
            <label class="fadeIn delay5">已有账号？</label>
          </div>
          <!--</form>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
  export default {
    name: 'Signin_login',
    data(){
        return{
            loginWin:false,
            signinWin:false,
        }
    },
    methods:{
       showWin(){
         this.loginWin = true
       },
       hideLoginWin(){
         this.loginWin = false
       },
       beforeEnter(el,done){
        Velocity(el,'fadeOut',10)
        setTimeout(()=>{
          Velocity(el,'fadeIn',{
            height:0,
            width:0
          },10)
        },20)
        setTimeout(()=>{
           Velocity(el,{
           scale:0,
           totateX:360
         },500)
        },300)
       },
       enterLogin(el,done){
         console.log('进入动画')
         Velocity(el,{
           scale:0.3,
           rotateX:360,
           
         },500)
         
         setTimeout(()=>{
           console.log('延时１s')
           Velocity(el,{
             scale:1,
             height:'100px',
             width:'100px',
         },200)
         },1000)
         setTimeout(()=>{
           Velocity(el,{
             height:300
           },300)
         },1000)
         setTimeout(()=>{
           console.log('再延时１s')
           Velocity(el,{
             width:310
           },200)
         },1000)
         
       },
       leaveLogin(el,done){
         console.log('离开动画')
          Velocity(el, 'slideUp', {
          duration: 200
        }, {
          complete: done
        })
       },
       delay(el,done){
         Velocity(el,'fadeIn',{display:'block'},{delay:1600})
       }
    }
  }

</script>

<style scoped>
@import '../../assets/css/signin_signup.css'
</style>
