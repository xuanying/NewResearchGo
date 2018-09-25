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
          <span id="change_word">换一批</span>
        </section>
        <section class="result_box">
          <div class="re_block" v-for="(item,index) in paperInfo" :key="index">
            <span class="se_year">{{item.Paper_Year}}</span>
            <h1><a>{{item.Paper_Title}}</a></h1>
            <p class="se_author" v-for="(Author,index) in item.Paper_Author" :key="index">
                <a >{{Author.Author_Name + '(' + Author.Author_Level + ')'}}</a>,
            </p>
            <p class="se_jour"><a href="">Proceedings of International Conference(A)</a></p>
            <p class="se_abs"><span class="se_type">摘要</span>A key problem in learning multiple objects from unlabeled
              images is that it is a priori impossible to tell which part of the image corresponds to each...<span
                class="abs_more">(More)</span></p>
            <div class="se_relate" title="与我相关">
              <img src="../../assets/images/about.png">
              <p class="re_keyword"><span>Mobile Network(medium)</span>,<span>Sensing(weak)</span></p>
              <p class="re_author"><span>Ming Liu(medium)</span></p>
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
        paperInfo:'',

      }
    },
    components: {
      Header
    },
    created(){
        this.getPaperInfo()
    },
    methods: {
        getPaperInfo(){
            axios({
                url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/readPaper',
                method:'get'
            }).then(response=>{
                if(response.status == 200){
                    this.paperInfo = response.data
                }
            }).catch(error=>{
                alert('服务器错误，获取数据失败')
            })
        },
      isMask(data) {
        this.bg_mask = data
      }
    }
  }

</script>

<style scoped>
@import '../../assets/css/viewPaper.css';
@import '../../assets/css/search.css';
@import '../../assets/css/base.css';

</style>
