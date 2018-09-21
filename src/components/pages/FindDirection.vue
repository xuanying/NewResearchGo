<template>
  <div>
    <Header :showSearchbox="isShowSearchbox"></Header>
    <div class="main">
      <div class="main_content">
        <section class="hot_box">
          <div class="dir_head">
            <h1>热门方向</h1>
            <span id="change_word">换一批</span>
          </div>
          <div class="hot_wrap">
            <ul>
              <li class="dir_list" v-for="(item,index) in directionData.Hot_List" :key="index">
                <h2><a href=""> {{item.Keyword}} </a></h2>
                <table cellspacing="10">
                  <tr>
                    <td>
                      <h3>文章</h3>
                      <p>录用数：{{item.Article.Article_Num}}<span class="tendency">{{item.Article.Article_Trend}}</span></p>
                      <p>引用数：{{item.Article.Cited_Num}}<span class="tendency"> {{item.Article.Cited_Trend}} </span></p>
                    </td>
                    <td>
                      <h3>作者</h3>
                      <p>作者数：{{item.Author.Author_Num}} <span class="tendency"> {{item.Author.Author_Trend}} </span></p>
                      <p> {{item.Author.Author_Max.Full_Name}} <span class="p_num"> {{item.Author.Author_Max.Max_Num}} </span></p>
                    </td>
                    <td>
                      <h3>刊物</h3>
                      <p>刊物数：{{item.Journal.Journal_Num}} <span class="tendency"> {{item.Journal.Journal_Trend}} </span></p>
                      <p> {{item.Journal.Journal_Max}} <span class="p_num"> {{item.Journal.Max_Num}} </span></p>
                    </td>
                    <td>
                      <h3>机构</h3>
                      <p>机构数：{{item.Institution.Institution_Num}} <span class="tendency"> {{item.Institution.Institution_Trend}} </span></p>
                      <p>{{item.Institution.Institution_Max.Institution}}<span class="p_num"> {{item.Institution.Institution_Max.Max_Num}} </span></p>
                    </td>
                  </tr>
                </table>
                <div class="dir_relate" title="与我相关">
                  <img src="../../assets/images/about.png">
                  <p>我的方向：<a class="p_a" v-for="(subItem,index) in item.Rel_Keyword" :key="index">{{subItem.Keyword}} <span class="p_num">{{subItem.Rel_Num}},</span></a></p>
                  <p>好友：<span>Ming Liu<span class="p_num">3</span></span>,<span>Guihai Chen<span class="p_num">5</span></span></p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section class="potential_box">
          <div class="dir_head">
            <h1>预测热门方向</h1>
            <span id="change_word2">换一批</span>
          </div>
          <div class="hot_wrap">
            <ul>
              <li class="dir_list">
                <h2><a href="">Deep Learing</a></h2>
                <table cellspacing="10">
                  <tr>
                    <td>
                      <h3>文章</h3>
                      <p>录用数：200<span class="tendency">10%</span></p>
                      <p>引用数：89<span class="tendency">3%</span></p>
                    </td>
                    <td>
                      <h3>作者</h3>
                      <p>作者数：500<span class="tendency">10%</span></p>
                      <p>Xuelong Li<span class="p_num">80</span></p>
                    </td>
                    <td>
                      <h3>刊物</h3>
                      <p>刊物数：18<span class="tendency">10%</span></p>
                      <p>ACM TON<span class="p_num">80</span></p>
                    </td>
                    <td>
                      <h3>机构</h3>
                      <p>机构数：18<span class="tendency">10%</span></p>
                      <p>UESTC<span class="p_num">80</span></p>
                    </td>
                  </tr>
                </table>
                <div class="dir_relate" title="与我相关">
                  <img src="../../assets/images/about.png">
                  <p>研究方向：<span>Big Data <span class="p_num">12</span></span>,<span>Face Recognition<span class="p_num">10</span></span></p>
                  <p>好友：<span>Ming Liu<span class="p_num">3</span></span>,<span>Guihai Chen<span class="p_num">5</span></span></p>
                </div>
              </li>
            </ul>
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
    name: 'FindDirection',
    data() {
      return {
        isShowSearchbox: true,
        isShow: false,
        directionData:''
      }
    },
    components: {
      Header
    },
    created(){
        this.getDirectionInfo()
    },
    methods: {
        getDirectionInfo(){
            axios({
                url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/findDirection',
                method:'get'
            }).then(response=>{
                if(response.status == 200){
                    this.directionData = response.data
                }
            }).catch(error=>{
                console.log('服务器错误，获取数据失败')
            })
        },
        toReadPaper() {
        this.$router.push({
          path: '/readPaper'
        })
      },
        showAnimate() {
        this.isShow = true
      }
    }

  }

</script>

<style scoped>
  
  @import '../../assets/css/base.css';
  @import '../../assets/css/findDirection.css';
</style>
