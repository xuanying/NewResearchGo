<template>
  <div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="bg_mask" v-show="bg_mask"></div>
      <div class="main_content">
        <section class="hot_box">
          <div class="dir_head">
            <h1>热门方向</h1>
            <span id="change_word" @click="changePage()">换一批</span>
          </div>
          <div class="hot_wrap">
            <ul ref="rect" :style="{width:directionWidth + 'px'}">
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
                  <p>我的方向：<a class="p_a" v-for="(subItem,index) in item.Rel_Keyword" :key="index">{{subItem.Keyword}} <span class="p_num">{{subItem.Rel_Num}} </span></a></p>
                  <p>我的好友：<span class="p_a" v-for="(subItem,index) in item.Rel_Friend" :key="index">{{subItem.Author_Name}}<span class="p_num"> {{subItem.Rel_Num}} </span></span></p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section class="potential_box">
          <div class="dir_head">
            <h1>预测热门方向</h1>
            <span id="change_word2" @click="changePrePage()">换一批</span>
          </div>
          <div class="hot_wrap">
            <ul :style="{width:directionWidth + 'px'}" ref="preDirection">
              <li class="dir_list" v-for="(item,index) in directionData.Potential_List" :key="index">
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
                      <h3>机构</h3>
                      <p>机构数：{{item.Institution.Institution_Num}} <span class="tendency"> {{item.Institution.Institution_Trend}} </span></p>
                      <p>{{item.Institution.Institution_Max.Institution}}<span class="p_num"> {{item.Institution.Institution_Max.Max_Num}} </span></p>
                    </td>
                  </tr>
                </table>
                <div class="dir_relate" title="与我相关">
                  <img src="../../assets/images/about.png">
                  <p>我的方向：<a class="p_a" v-for="(subItem,index) in item.Rel_Keyword" :key="index">{{subItem.Keyword}} <span class="p_num">{{subItem.Rel_Num}} </span></a></p>
                  <p>我的好友：<span class="p_a" v-for="(subItem,index) in item.Rel_Friend" :key="index">{{subItem.Author_Name}}<span class="p_num"> {{subItem.Rel_Num}} </span></span></p>
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
  import Velocity from 'velocity-animate'
  export default {
    name: 'FindDirection',
    data() {
      return {
        isShowSearchbox: true,
        isShow: false,
        directionData:'',
        directionWidth:820,
        preDirectionWidth:820,
        li_index:0,
        bg_mask:false
      }
    },
    components: {
      Header
    },
    created(){
        this.getDirectionInfo()
        
    },
    // computed:{
    //     directionWidth:function(){
    //         let directionWidth = this.directionData.Hot_List.length
    //         console.log(directionWidth)
    //         return directionWidth
    //     }
    // },
    methods: {
        getDirectionInfo(){
            axios({
                url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/findDirection',
                method:'get'
            }).then(response=>{
                if(response.status == 200){
                    this.directionData = response.data
                    let arr = this.computeDrictionWidth()
                    this.directionWidth = arr[0]
                    this.preDirectionWidth = arr[1]
                }
            }).catch(error=>{
                console.log('服务器错误，获取数据失败')
            })
        },
        computeDrictionWidth(){
            let arr,dwidth,preWidth,numDire,numPre
            numDire = this.directionData.Hot_List.length
            numPre = this.directionData.Potential_List.length
            dwidth = 820 * numDire
            preWidth = 820 * numPre
            arr = new Array()
            arr.push(dwidth)
            arr.push(preWidth)
            return arr
        },
        toReadPaper() {
        this.$router.push({
          path: '/readPaper'
        })
      },
        changePage(){
            let offset,now_index,daLen
            daLen = this.directionData.Hot_List.length
            now_index = (this.li_index + 1) % daLen
            this.li_index = now_index
            offset = now_index * -820
            Velocity(this.$refs.rect,{
                left:offset
            })
        },
        changePrePage(){
            let offset,now_index,daLen
            daLen = this.directionData.Potential_List.length
            now_index = (this.li_index + 1) % daLen
            this.li_index = now_index
            offset = now_index * -820
            Velocity(this.$refs.preDirection,{
                left:offset
            })
        },
        isMask(data){
          this.bg_mask = data
        }
    }

  }

</script>

<style scoped>
  
  @import '../../assets/css/base.css';
  @import '../../assets/css/findDirection.css';
</style>
