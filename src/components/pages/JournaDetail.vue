<template>
  <div>
    <div class="bg_mask" v-show="bg_mask"></div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="main_content">
        <div class="journal_base_info">
          <section class="journal_header">
            <div class="journal_title">
              <button class="collection" type="button" name="CollectionFalse">收藏</button>
              <h2>{{journaInfo.Journal}}</h2>
            </div>
          </section>
          <section class="journal_level">
            <h2>期刊等级</h2>
            <div class="detail_message">
              <!-- <p>1877-0509</p> -->
              <p>{{journaInfo.Level}}</p>
            </div>
          </section>
          <section class="journal_ISSN">
            <h2>ISSN</h2>
            <div class="detail_message">
              <!-- <p>1877-0509</p> -->
              <p>{{journaInfo.ISSN}}</p>
            </div>
          </section>
          <section class="journal_factor">
            <h2>影响因子</h2>
            <div class="detail_message">
              <!-- <p>144.800</p> -->
              <p>{{journaInfo.Journal_Impact_Factor}}</p>
            </div>
          </section>
        </div>
        <div class="line_chart">
          <h2>近五年文章数</h2>
          <div class="detail_message" id="hot_canvasDiv">
            <Chart :id="id" :option="option" v-if="flag"></Chart>
          </div>
        </div>
        <div class="journal_keyword">
          <header class="main_content_head">
            <h2 class="title" :class="{'active':hotOrPotential}" @click="hotKeywordBtn()">热门关键词</h2>
            <h2 class="title" :class="{'active':!hotOrPotential}" style="left: -12px" @click="potentialKeywordsBtn()">潜力关键词</h2>
          </header>
          <div id="hot_keywords" v-show="!isPotentialKeywordsShow">
              <TagCloud class="hotKeywordTag" :data="journaInfo.hot_keyword" :config="tagConfig" @clickTag="clickTagItem" v-if="tagShow"></TagCloud>
          </div>
          <div id="potential_keywords" v-show="isPotentialKeywordsShow">
              <TagCloud class="hotKeywordTag" :data="journaInfo.potentail_word" :config="tagConfig" @clickTag="clickTagItem" v-if="tagShow"></TagCloud>
          </div>
        </div>
        <div class="jour_auth">
          <header class="main_content_head">
            <h2 class="title active">知名学者</h2>
          </header>
          <ul>
             <li v-for="(scholarValue,scholar,scholarIndex) in journaInfo.Author_Rec" :key="scholarIndex"><span class="num">{{scholarIndex + 1}}</span><a href="#" class="word_list">{{scholar}}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import Header from '../common/Header'
  import axios from 'axios'
  import Chart from '../common/Chart'
  import TagCloud from '../common/TagCloud.vue'
  export default {
    name: 'JournaDetail',
    data() {
      return {
        isShowSearchbox: true,
        bg_mask: false,
        isPotentialKeywordsShow:false,
        journaInfo: '',
        id: '近五年文章数',
        option: {},
        flag: false,
        tagConfig:{'radius':180,'maxFont':30},
        tagShow:false,
        hotOrPotential:true
      }
    },
    created() {
      this.getJournaInfo()
    },
    methods: {
      getJournaInfo() {
        axios({
          url: 'https://easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/journaDetail',
          method: 'get'
        }).then(response => {
          if (response.status == 200) {
            this.journaInfo = response.data
            this.drawChart()
            this.tagShow = true
          }
        }).catch(error => {
          alert('服务器错误，获取数据失败')
        })
      },
      drawChart() {
        let paperNum = this.journaInfo.Paper_Num
        if (paperNum != '{}') {
          let year_list = [],
            num_list = []
          for (let key in paperNum) {
            year_list.push(key)
            num_list.push(paperNum[key])
          }
          this.option = {
            credits: {
              enabled: false
            },
            chart: {
              type: 'column',
              width: 650,
              height: 450,
              marginTop: 50
            },
            title: {
              text: ''
            },
            xAxis: {
              title: {
                align: 'high',
                text: '年份'
              },
              categories: year_list
            },
            yAxis: {
              min: 0,
              title: {
                rotation: '',
                align: 'high',
                text: '文章数'
              }
            },
            legend: {
              shadow: false
            },
            tooltip: {
              shared: true
            },
            plotOptions: {
              column: {
                grouping: false,
                shadow: false,
                borderWidth: 0,
                // events: {
                //   click: function (e) {
                //     choose_list = this.paperInfo.Paper_Cited;
                //     obj_ref.style.backgroundColor = "#ececec";
                //     obj_cite.style.backgroundColor = "grey";
                //     var year_choose = e.point.category;
                //     var count_choose = e.point.y;
                //     articles.empty();
                //     $.each(choose_list, function (e, value) {
                //       // choose_paper(value, year_choose, count_choose);
                //       //是否A类
                //       var isa = false;
                //       if (value.Paper_Level == 'A') {
                //         isa = true;
                //       }
                //       //用户选中类型，0为全部，1为A类
                //       var type_choose = 0;
                //       if (count_choose == article_messages.Cited_Yearly[year_choose][1]) {
                //         type_choose = 1;
                //       }
                //       if (type_choose == 1) {
                //         if (value.Paper_Year == year_choose && isa == true) {
                //           create_articleLi(value);
                //           articles.append(article_li);
                //         }
                //       } else {
                //         if (value.Paper_Year == year_choose) {
                //           create_articleLi(value);
                //           articles.append(article_li);
                //         }
                //       }
                //     });
                //     pager(choose_list.length);
                //   }
                // }
              }
            },
            series: [{
              name: '文章数',
              color: 'rgba(165,170,217,1)',
              data: num_list,
              pointPadding: 0.3
            }]
          }
          this.flag = true
        }
      },
      isMask(data) {
        this.bg_mask = data
      },
      clickTagItem(tag){
          console.log(tag.name)
          this.$router.push({
                    name:'KeywordDetail'
                })
      },
      hotKeywordBtn(){
          this.isPotentialKeywordsShow = false
          this.hotOrPotential = true
      },
      potentialKeywordsBtn(){
          this.isPotentialKeywordsShow = true
          this.hotOrPotential = false
      }
    },
    components: {
      Header,
      Chart,
      TagCloud
    }
  }

</script>

<style scoped>
  @import '../../assets/css/base.css';
  @import '../../assets/css/journaDetail.css';

</style>
