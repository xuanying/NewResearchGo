<template>
  <div>
    <header class="topbar">
      <div class="topbar_content">
        <div class="topbar_title" @click="returnMain()">
          <img :src="logoimg">
          <h1>ResearchGo</h1>
        </div>
        <div class="search_box" v-show="isShowSearchbox">
          <form id="search_box" method="post" action="/search/">
            <div class="search_input" :class="{'foucs':isFoucs,'blur':isBlur}">
              <input id="input_con" name="context" class="input" type="text" @focus="searchboxFocus()" @blur="searchboxBlur()">
              <input type="submit" value="Go">
            </div>
          </form>
        </div>
        <div class="login_signin" v-show="!isLogin">
          <ul>
            <li @click="login()">登录 | </li>
            <li @click="signin()">注册</li>
          </ul>
        </div>
        <div class="topbar_user" v-show="isLogin">
          <span id="user_name" v-text="user_info.Nick_Name"></span>
          <div id="t_list" @mouseover="slidedown()" @mouseout="slideup()">
            <img class="portrait" :src="user_info.Portrait">
            <transition @enter="enter" @leave="leave">
              <ul class="topbar_list" v-show="isShow">
                <li><a >我的主页</a></li>
                <li><a >我的邮件</a></li>
                <li><a >分享</a></li>
                <li @click="logout()"><a>退出登录</a></li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </header>
    <div id="window" :class="{'animationWin':loginWin||signinWin }" >
      <div class="page for_login" v-show="loginWin">

        <img class="fadeIn delay5 img_x" src="../../assets/images/x.png" @click="hideLoginWin()">
        <div class="page-content">
          <!--<form id="form_login" action="/register/" method="post">-->
          <div class="input-row">
            <label class="label fadeIn delay1">邮箱</label>
            <input id="logName" name="username" type="email" required="required"
             class="input fadeIn delay1" v-model="username"/>
          </div>
          <div class="input-row">
            <label class="label fadeIn delay2">密码</label>
            <input id="logPsd" name="password" type="password" required="required" 
            class="input fadeIn delay2" v-model="passWord"/>
          </div>
          <!--<input id="state" name = 'state' value = 'login' type = 'hidden' />-->
          <div class="input-row">
            <label class="label fadeIn delay3 pointer">验证码</label>
            <input id="logcode_up" type="Verification" required="required" 
            class="input fadeIn delay3" v-model="vCode"/>
            <ul id="logcode_in" class="fadeIn delay4 pointer" title="看不清楚？点击更换">
              <span class="word_1" style="color: rgb(236, 214, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">H</span>
              <span class="word_2" style="color: rgb(50, 175, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">v</span>
              <span class="word_3" style="color: rgb(50, 125, 180); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">I</span>
              <span class="word_4" style="color: rgb(254, 96, 48); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">U</span>
            </ul>
          </div>
          <div class="input-row perspective">
            <button id="logsub" class="button fadeIn delay4" @click="userLogin()"><span class="default">登录</span>
            </button>
            <label class="fadeIn delay5 pointer" @click="signin()">还未注册？</label>
          </div>
          <!--</form>-->
        </div>
      </div>
      <div class="page for_signup" v-show="signinWin">
        <img class="fadeIn delay5 img_x" src="../../assets/images/x.png" @click="hideLoginWin()">
        <div class="page-content">
          <!--<form id="form_reg" action="/register/" method="post">-->
          <div class="input-row">
            <label class="label fadeIn delay1">邮箱</label>
            <input id="signName" name="username" type="email" class="input fadeIn delay1" v-model="username" />
          </div>
          <div class="input-row">
            <label class="label fadeIn delay2">密码</label>
            <input id="signPsd" name="password" type="password" class="input fadeIn delay2" v-model="passWord"/>
          </div>
          <div class="input-row">
            <label class="label fadeIn delay2">再次输入密码</label>
            <input id="repsd" type="password" class="input fadeIn delay2" />
          </div>
          <!--<input id="rstate" name = 'state' value = 'login' type = 'hidden' />-->
          <div class="input-row">
            <label class="label fadeIn delay3">验证码</label>
            <input id="signcode_up" type="Verification" class="input fadeIn delay3" v-model="vCode"/>
            <ul id="signcode_in" class="fadeIn delay4 pointer" title="看不清楚？点击更换">
              <span class="word_1" style="color: rgb(236, 214, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">H</span>
              <span class="word_2" style="color: rgb(50, 175, 195); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">v</span>
              <span class="word_3" style="color: rgb(50, 125, 180); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">I</span>
              <span class="word_4" style="color: rgb(254, 96, 48); text-align: center; height: 100%; line-height: 40px; width: 15%; padding: 0 1%; font-size: 1.5em; display: inline-block;">U</span>
            </ul>
          </div>
          <div class="input-row perspective">
            <button id="signsub" class="button fadeIn delay4" @click="userSignin()"><span class="default">注册</span>
            </button>
            <label class="fadeIn delay5 pointer" @click="login()">已有账号？</label>
          </div>
          <!--</form>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate'
  import axios from 'axios'
  import {
    setCookie,
    getCookie,
    delCookie,
    delAllCookie
  } from '@/tools/cookie.js'
  export default {
    name: 'Header',
    data() {
      return {
        logoimg: require('../../assets/images/xnr.jpg'),
        portraitimg: require('../../assets/images/portrait.png'),
        defaultPortrait: require('../../assets/images/signup1.jpg'),
        isShow: false,
        isLogin: false,
        isShowSearchbox: this.showSearchbox,
        user_info: '',
        searchboxfb: '',
        isFoucs: false,
        isBlur: true,
        loginWin:false,
        signinWin:false,
        username:'',
        passWord:'',
        vCode:'',
      }
    },
    props: ['showSearchbox'],
    created() {
      this.getInfo()
      
    },
    methods: {
      getInfo() {
        console.log('created')
        let loginData = getCookie('loginData')
        let loginDataJson = JSON.parse(loginData)
        if(loginDataJson.success){
          this.user_info = loginDataJson
        }
        if (this.user_info.Portrait == 'None') {
              this.user_info.Portrait = this.defaultPortrait
            }
            this.isLogin = true
      },
      returnMain() {
        this.$router.push({
          name: 'Main'
        })
      },
      searchboxFocus() {
        this.isFoucs = true
        this.isBlur = false
      },
      searchboxBlur() {
        this.isBlur = true
        this.isFoucs = false
      },
      slidedown() {
        this.isShow = true
      },
      slideup() {
        this.isShow = false
      },
      enter(el, done) {
        Velocity(el, 'slideDown', {
          duration: 200
        }, {
          complete: done
        })
      },
      leave(el, done) {
        Velocity(el, 'slideUp', {
          duration: 200
        }, {
          complete: done
        })
      },
      login() {
        this.loginWin = true
        this.signinWin = false
        this.$emit('isMask',true)
      },
      signin() {
        this.signinWin = true
        this.loginWin = false
        this.$emit('isMask',true)
      },
      hideLoginWin(){
        this.signinWin = false
        this.loginWin = false
        this.$emit('isMask',false)
      },
      logout(){
        this.isLogin = false
        delCookie('loginData')
      },
      userLogin(){
        axios({
          url: 'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/login',
          method: 'post',
          data:{username:this.username,passWord:this.passWord}
        }).then(response => {
          if (response.status == 200) {
            this.user_info = response.data
            console.log(this.user_info)
            if (this.user_info.Portrait == 'None') {
              this.user_info.Portrait = this.defaultPortrait
            }
            this.isLogin = true
            this.hideLoginWin()
            setCookie('loginData',JSON.stringify(response.data),7)
            console.log( 'userLogin setCookie success' + getCookie('loginData'))
          } else {
            alert('服务器错误，无法获取数据')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      userSignin(){
        alert('注册成功')
        this.hideLoginWin()
      }
    }
  }

</script>

<style scoped>
  @import '../../assets/css/base.css';
  @import '../../assets/css/signin_signup.css';

</style>
