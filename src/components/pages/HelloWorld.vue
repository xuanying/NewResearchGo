<template>
  <div  class="helloWorld">
    <div class="bg_mask" v-show="bg_mask"></div>
    <div class="header">
      <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    </div>
    <div class="main">
      <div class="main_content">
        <section class="RGname">
          <h1>让科研简单点</h1>
        </section>
        <section class="search_con">
          <form id="search_con" method="post" action="/search/">
            <input name="select" id="select" type="text" value="paper" style="display: none">
            <div class="con_input" :class="{'foucs':isFocus,'blur':isBlur}">
              <input id="input_con" name="context" class="input" type="text" @focus="searchboxFocus()" @blur="searchboxBlur()">
              <input type="submit" value="Go">
            </div>
          </form>
          <p class="search_try">试试：
            <a href="">{{try_info.Try_Author.Full_Name}} </a>
            <a href="">{{try_info.Try_Keyword.Keyword}} </a>
          </p>

        </section>
        <section class="choose_box">
          <ul>
            <li @click="findDirection()" id="dire">
              <img src="../../assets/images/dire.png">
              <span>我要找方向</span>
            </li>
            <li id="paper" @click="readPaper()">
              <img src="../../assets/images/paper.png">
              <span>我要看新文章</span>
            </li>
            <li id="contribute" @click="toContribute()">
              <img src="../../assets/images/org.png">
              <span>我要投稿</span>
            </li>
            <li class="cur" id="cur" @click="toRank()">
              <img src="../../assets/images/cur.png">
              <span>我很好奇</span>
            </li>
          </ul>
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
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        isShowSearchbox: false,
        isFocus: false,
        isBlur: true,
        try_info: '',
        bg_mask:false,
      }
    },
    components: {
      Header
    },
    created() {
      this.getTryinfo()
    },
    methods: {
      getTryinfo() {
        axios({
          url: 'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/indextry',
          method: 'get'
        }).then(response => {
          if (response.status == 200) {
            this.try_info = response.data
          } else {
            console.log('服务器错误，获取数据失败')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      searchboxFocus() {
        this.isFocus = true
        this.isBlur = false
      },
      searchboxBlur() {
        this.isFocus = false
        this.isBlur = true
      },
      findDirection() {
        this.$router.push({
          name: 'FindDirection'
        })
      },
      readPaper(){
        this.$router.push({
          name:'ReadPaper'
        })
      },
      toContribute(){
        this.$router.push({
          name:'Contribute'
        })
      },
      toRank(){
        this.$router.push({
          name:'Rank'
        })
      },
      isMask(data){
        this.bg_mask = data
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/index.css';

</style>
