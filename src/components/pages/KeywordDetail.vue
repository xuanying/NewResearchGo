<template>
  <div>
    <div class="bg_mask" v-show="bg_mask"></div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="main_content">
        <div class="keyword_messages">
          <button class="collection" type="button" name="CollectionFalse">收藏</button>
          <h1></h1>
          <section class="basic_informations">
            <section class="zhu_chart">
              <h2>热度柱状图</h2>
              <div id="container">
                <Chart :id="id" :option="option" v-if="flag"></Chart>
              </div>
            </section>
            <section class="fields">
              <h2>领域</h2>
              <div class="detail_message">
                <ul>
                  <li>{{keywordInfo.Keyword_Domain}}</li>
                </ul>
              </div>
            </section>
            <section class="masters">
              <h2>作者列表</h2>
              <div class="detail_message">
                <ul>
                  <li v-for="(expertList,expertIndex) in keywordInfo.Keyword_Scholar" :key="expertIndex"><a>{{expertList.Author_Name + '(' + expertList.Author_Level + ')'}}</a></li>
                </ul>
              </div>
            </section>
          </section>
          <section class="article_list">
            <header class="introduction_head">
              <h2 class="title">文章列表</h2>
              <ul>
                <li id="time_ordering"  @click="orderByTime()" :class="{'active':isActive}">按时间排列</li>
                <li id="level_ordering" :class="{'active':!isActive}" @click="orderByQuality()">按档次排列</li>
              </ul>
            </header>
            <div class="articlelists">
              <ul class="new_list">
                <li v-for="(paperList,paperIndex) in paperFinally" :key="paperIndex">
                  <h3><span class="ar_year">{{paperList.Paper_Year}}</span><a>{{paperList.Paper_Title}}</a></h3>
                  <p class="ar_author"> 
                    <a v-for="(authorList,authorIndex) in paperList.Paper_Author" :key="authorIndex">{{authorList.Author_Name + '(' + authorList.Author_Level + ')'}}</a>;
                  </p>
                  <p class="ar_jour"><a>{{paperList.Paper_Journal + '(' + paperList.Journal_Level + ')'}}</a></p>
                  <p class="ar_domain">领域：<span v-for="(domainlevel,domain,domainIndex) in paperList.Paper_Domain" :key="domainIndex">{{domain}}</span></p>
                  <p class="ar_level">档次：<span>{{paperList.Paper_Level}}</span></p>
                  <div class="item_info">
                    <span class="high">{{paperList.Cited_Num}}</span>
                    <span class="cite">{{paperList.Cited_High}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="moreinformation" id="pagerArea" style="-moz-user-select:none;"></div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header'
  import Chart from '../common/Chart.vue'
  import axios from 'axios'
  export default {
    name: 'KeywordDetail',
    data() {
      return {
        isShowSearchbox: true,
        bg_mask: false,
        keywordInfo:'',
        id: '热度柱状图',
        option: {},
        flag:false,
        isActive:true,
        paperFinally:[],

      }
    },
    components: {
      Header,
      Chart
    },
    created(){
        this.getKeywordInfo()
    },
    methods: {
        getKeywordInfo(){
            axios({
                url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/keywordDetail',
                method:'get'
            }).then(response=>{
                if(response.status == 200){
                    this.keywordInfo = response.data
                    this.drawChart()
                    this.orderByTime()
                }
            }).catch(error=>{
                alert('服务器错误，获取数据失败')
            })
        },
      isMask(data) {
        this.bg_mask = data
      },
      drawChart() {
        let yearObj = this.keywordInfo.Article_Yearly
        if (yearObj != '{}') {
          let year_list = [],num_list =[] ,high_list = []
          for(let key in yearObj){
            year_list.push(key)
            num_list.push(yearObj[key][0])
            high_list.push(yearObj[key][1])
          }
          // console.log(num_list)
          this.option = {
            credits:{
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
            yAxis: [{
              min: 0,
              title: {
                rotation: '',
                align: 'high',
                text: '文章数'
              }
            }],
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
              name: '文章',
              color: 'rgba(165,170,217,1)',
              data: num_list,
              pointPadding: 0.3,
              pointPlacement: 0
            }, {
              name: 'A类',
              color: 'rgba(126,86,134,.9)',
              data: high_list,
              pointPadding: 0.3,
              pointPlacement: 0
            }]
          }
        }
        this.flag=true
      },
      orderByTime(){
        this.isActive = true
        console.log(this.keywordInfo.Keyword_Paper)
        this.paperFinally = this.keywordInfo.Keyword_Paper.sort(function(a, b){
             if(a.Paper_Year > b.Paper_Year) return -1;
             if(a.Paper_Year < b.Paper_Year) return 1;
             if(a.Paper_Year = b.Paper_Year){
                 a.Paper_Level.localeCompare(b.Paper_Level);
             }
             return 0;
         });
      },
      orderByQuality(){
        this.isActive =false
        this.paperFinally = this.keywordInfo.Keyword_Paper.sort(function(a, b) {
             if(a.Paper_Level.localeCompare(b.Paper_Level) != 0){
                 return a.Paper_Level.localeCompare(b.Paper_Level);//比较两篇文章的等级高低并返回排序
             }else {
                 if(a.Paper_Year > b.Paper_Year) return -1;
                 if(a.Paper_Year < b.Paper_Year) return 1;
                 return 0;
             }
         })
      }
    }

  }

</script>

<style scoped>
  @import '../../assets/css/base.css';
  @import '../../assets/css/keywordDetail.css';

</style>
