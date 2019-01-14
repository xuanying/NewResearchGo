<template>
  <div>
    <div class="bg_mask" v-show="bg_mask"></div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="main_content">
        <section class="list_head">
          <!-- <span>筛选</span> -->
          <div class="filter_div">
            <!-- <input id="list_filter" name="filter" class="input" type="text">
            <input type="button" value=""> -->
          </div>
          <div class="keyworddiv">
            <span id="change_word" @click="showKeywordMatchLevel()">关键词匹配度</span>
            <ul class="outside" v-show="isShowMatchLevel">
                            <li v-for="(keyword,keywordIndex) in keywordList" :key="keywordIndex" :class="{'checked':keyArr.includes(keyword)}">
                                <span @click="getPaperByKeyword(keyword,keywordIndex)" >
                                  {{(keywordIndex+1)/keywordList.length*100 + '%' + '('+(keywordIndex+1)+'个关键词匹配)'}}
                                  </span>
                                <!-- <ul class="inside">
                                    <li>a1</li>
                                    <li>a2</li>
                                    <li>a3</li>
                                    <li>a4</li>
                                </ul> -->
                            </li>
                            <!-- <button @click="submitKeyword()">确定</button>
                            <button @click="closeKeywordList()">返回</button> -->
            </ul>
              
          </div>
          
        </section>
        <section class="result_box">
          <div class="re_block" v-for="(item,index) in paperInfo" :key="index">
            <span class="se_year">{{item.Paper_Year}}</span>
            <h1><a @click="toArticleDetail(item.Paper_Title)">{{item.Paper_Title}}</a></h1>
            <p class="se_author" v-for="(Author,index) in item.Paper_Author" :key="index+1000">
              <a>{{Author | paperAuthorClean}}</a>
              <!-- + '(' + Author.Author_Level + ')' -->
            </p>
            <p class="se_jour"><a href="">{{item.ISSN}}</a></p>
            <p>score:<a style="color:red">{{item.score}}</a></p>
            <p class="se_abs" v-show="!(hideAbsDetail ^ pIndex == index)"><span class="se_type">摘要</span>{{item.Paper_Abstract |
              abstractAbbr}}<span class="abs_more" @click="hideAbsDetailBtn(index)">More</span></p>
            <p class="se_abs" v-show="showAbsDetail && pIndex == index"><span class="se_type">摘要</span>{{item.Paper_Abstract}}<span class="abs_more"
                @click="showAbsDetailBtn(index)">Less</span></p>
            <div class="se_relate" title="与我相关">
              <img src="../../assets/images/about.png">
              <p>我的方向：
                <label class="re_keyword" v-for="(Relkeyword,index) in item.keyWords" :key="index+10000">
                <a> {{Relkeyword}}</a>
                <!-- <span> {{Relkeyword.Rel_Level}} </span> -->
                </label>
              </p>
              <!-- <p>我的好友：
                <label class="re_author" v-for="(Relfriend,index) in item.Rel_Friend" :key="index+100000">
                <a>{{Relfriend.Author_Name}}</a>
                <span>{{Relfriend.Rel_Level}}</span>,</label>
              </p> -->
              
            </div>
          </div>
          <Pageination :total="totalPaperRecord" :size="size" :page="paperPage" :changge="pageFn" :isUrl="true"></Pageination>
        </section>
        <div class="clear"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '../common/Header'
  import Pageination from '../common/Pageination'
  import axios from 'axios'
  import {
    setCookie,
    getCookie,
    delCookie,
    delAllCookie
  } from '@/tools/cookie.js'
  import baseUrl from '@/serviceAPI.config.js'
  export default {
    name: 'ReadPaper',
    data() {
      return {
        isShowSearchbox: true,
        bg_mask: false,
        paperInfo: '',
        showAbsAbbr:true,
        showAbsDetail: false,
        hideAbsDetail:false,
        pIndex:-1,
        upshowIndex:5,
        lowshowIndex:0,
        keywordList:[],
        keyArr:[],
        // showKeyword:false,
        isChecked:false,
        token:'',
        userId:28,
        matchLevel:1,
        isShowMatchLevel:false,
        paperPage:1,
        totalPaperRecord:500,
        size:10,
      }
    },
    components: {
      Header,
      Pageination
    },
    created() {
      this.getLoginInfo()
    },
    methods: {
      // getKeyword(){
      //   let url = baseUrl + '/api/getKeywordListById/' + this.userId
      //   // console.log(url)
      //   axios({
      //     url:url,
      //     method:'get',
      //     headers:{
      //       // 'Content-type':' application/json',
      //       'Authorization':this.token
      //     }
      //   }).then(response=>{
      //     if(response.status==200){
      //       this.keywordList = response.data
      //       console.log("getPaperInfo")
      //       this.getPaperInfo()
      //     }
      //   }).catch(error=>{
      //     alert(error)
      //   })
      // },
      getLoginInfo(){
        
        // let loginInfo = getCookie('loginData')
        // let loginInfoJson = JSON.parse(loginInfo)
        // this.token = loginInfoJson.token
        // this.userId = loginInfoJson.userId
        // this.getPaperInfo()
      },
      getPaperInfo() {
        console.log('getPaperInfo')
        axios({
          url: baseUrl + '/api/getRecommendedPaper',
          method: 'get',
          params:{
            userId:this.userId,
            keywordNum:this.matchLevel,
            start:this.paperPage-1
          }
        }).then(response => {
          if (response.status == 200) {
            if(response.data==null || response.data == ''){
              alert("数据计算中，请稍后再试！")
            }else{
              this.paperInfo = response.data.content
              this.totalPaperRecord = response.data.totalNum
            }
          }
        }).catch(error => {
          alert('服务器错误，获取数据失败')
        })
      },
      chnagePaper(){
        this.showKeyword = true
        // console.log(this.paperInfo.length)
        // if(this.upshowIndex == this.paperInfo.length){
        //   this.lowshowIndex = 0
        //   this.upshowIndex = 0
        // }
        // if(this.paperInfo.length < this.upshowIndex + 5){
        //   this.lowshowIndex = this.upshowIndex
        //   this.upshowIndex = this.paperInfo.length
        // }else{
        //   this.lowshowIndex = this.upshowIndex
        //   this.upshowIndex += 5
        // }
      },
      isMask(data) {
        this.bg_mask = data
      },
      hideAbsDetailBtn(index){
        this.showAbsDetail = true
        this.pIndex = index
      },
      showAbsDetailBtn(index) {
        this.showAbsDetail = false
        this.pIndex = -1
        console.log(index + 'index')
      },
      toArticleDetail(paperTitle){
        this.$router.push({
          name:'ArticleDetail',
          params:{
            title:paperTitle
          }
        })
      },
      getPaperByKeyword(keyword,keywordIndex){
        console.log(keywordIndex+1)
        this.matchLevel = keywordIndex + 1
        this.getPaperInfo()
        this.isShowMatchLevel = false
        // this.isChecked = !this.isChecked
        // if(this.keyArr.includes(keyword)){
        //   this.removeByValue(this.keyArr,keyword)
        // }else{
        //   this.keyArr.push(keyword)
        // }
        // console.log(this.keyArr)
      },
      removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
          if(arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      },
      submitKeyword(){
        this.showKeyword = false
        // axios({
        //   url:'',
        //   method:'post',
        //   data:{}
        // }).then(response=>{

        // }).catch(errot=>{

        // })
      },
      closeKeywordList(){
        this.showKeyword = false
      },
      showKeywordMatchLevel(){
        this.isShowMatchLevel = true
      },
      pageFn(pageNum){
        this.paperPage = pageNum
        console.log("di" + pageNum + "ye")
        this.getPaperInfo()
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    },
    filters: {
      abstractAbbr(abs) {
        if (abs.length > 420) {
          let absAbbr = abs.substring(0, 420) + '...'
          return absAbbr
        }else{
          return abs
        }
      },
      paperAuthorClean(authorname){
                let name = authorname.split("!");
                return name[0]
            }
    }
  }

</script>

<style scoped>
  @import '../../assets/css/viewPaper.css';
  @import '../../assets/css/search.css';
  @import '../../assets/css/base.css';

</style>
