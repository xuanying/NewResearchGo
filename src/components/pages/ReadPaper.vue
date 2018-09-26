<template>
  <div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="bg_mask" v-show="bg_mask"></div>
      <div class="main_content">
        <section class="list_head">
          <span>筛选</span>
          <div class="filter_div">
            <input id="list_filter" name="filter" class="input" type="text">
            <input type="button" value="">
          </div>
          <span id="change_word" @click="chnagePaper()">换一批</span>
        </section>
        <section class="result_box">
          <div class="re_block" v-for="(item,index) in paperInfo" :key="index" v-show="changepage(index)">
            <span class="se_year">{{item.Paper_Year}}</span>
            <h1><a>{{item.Paper_Title}}</a></h1>
            <p class="se_author" v-for="(Author,index) in item.Paper_Author" :key="index+1000">
              <a>{{Author.Author_Name + '(' + Author.Author_Level + ')'}}</a>,
            </p>
            <p class="se_jour"><a href="">{{item.Paper_Journal + '(' + item.Journal_Level + ')'}}</a></p>
            <p class="se_abs" v-show="!(hideAbsDetail ^ pIndex == index)"><span class="se_type">摘要</span>{{item.Paper_Abstract |
              abstractAbbr}}<span class="abs_more" @click="hideAbsDetailBtn(index)">More</span></p>
            <p class="se_abs" v-show="showAbsDetail && pIndex == index"><span class="se_type">摘要</span>{{item.Paper_Abstract}}<span class="abs_more"
                @click="showAbsDetailBtn(index)">Less</span></p>
            <div class="se_relate" title="与我相关">
              <img src="../../assets/images/about.png">
              <p class="re_keyword" v-for="(Relkeyword,index) in item.Rel_Keyword" :key="index+10000">我的方向：
                <a> {{Relkeyword.Keyword}}</a>
                <span> {{Relkeyword.Rel_Level}} </span>,</p>
              <p class="re_author" v-for="(Relfriend,index) in item.Rel_Friend" :key="index+100000">我的好友：
                <a>{{Relfriend.Author_Name}}</a>
                <span>{{Relfriend.Rel_Level}}</span></p>
            </div>
          </div>
        </section>
        <div class="clear"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '../common/Header'
  import axios from 'axios'
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
        lowshowIndex:0

      }
    },
    components: {
      Header
    },
    created() {
      this.getPaperInfo()
    },
    methods: {
      getPaperInfo() {
        axios({
          url: 'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/readPaper',
          method: 'get'
        }).then(response => {
          if (response.status == 200) {
            this.paperInfo = response.data
          }
        }).catch(error => {
          alert('服务器错误，获取数据失败')
        })
      },
      chnagePaper(){
        console.log(this.paperInfo.length)
        if(this.upshowIndex == this.paperInfo.length){
          this.lowshowIndex = 0
          this.upshowIndex = 0
        }
        if(this.paperInfo.length < this.upshowIndex + 5){
          this.lowshowIndex = this.upshowIndex
          this.upshowIndex = this.paperInfo.length
        }else{
          this.lowshowIndex = this.upshowIndex
          this.upshowIndex += 5
        }
      },
      changepage(index){
        if(this.lowshowIndex <= index && index < this.upshowIndex){
          return true
        }else{
          return false
        }
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
      }
    }
  }

</script>

<style scoped>
  @import '../../assets/css/viewPaper.css';
  @import '../../assets/css/search.css';
  @import '../../assets/css/base.css';

</style>
