<template>
  <div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="main_content">
        <div class="article_messages">
          <button class="collection" type="button" name="CollectionFalse">收藏</button>
          <h1>{{paperInfo.Paper_Title}}</h1>
          <section class="journal_header">
            <div class="journal_logo"><img src="img/SCIENCE.gif" alt=""></div>
            <h2></h2>
            <div class="journal_title">
              <h2></h2>
            </div>
          </section>
          <section class="basic_informations">
            <section class="authors">
              <h2 id="authorrrrrr">作者</h2>
              <div class="detail_message">
                <ul>
                  <li class="author" v-for="(Author,authorIndex) in paperInfo.Paper_Author" :key="authorIndex">
                    <a>{{Author.Author_Name + '(' + Author.Author_Level + ')'}}</a>
                  </li>
                </ul>
              </div>
            </section>
            <section class="year">
              <h2>年份</h2>
              <div class="detail_message">
                <p>{{paperInfo.Paper_Year}}</p>
              </div>
            </section>
            <section class="abstract">
              <h2>摘要</h2>
              <div class="detail_message">
                <p v-show="moreOrLess">
                  {{paperInfo.Paper_Abstract | abstractAbbr}}
                  <span id="abstract_content"></span>
                  <span id="abstract_more" @click="absAbbr()">More</span>
                </p>
                <p v-show="!moreOrLess">
                  {{paperInfo.Paper_Abstract}}
                  <span id="abstract_content"></span>
                  <span id="abstract_more" @click="absAbbr()">Less</span>
                </p>
              </div>
            </section>
            <section class="keywords">
              <h2>关键词</h2>
              <div class="detail_message">
                <ul>
                  <li v-for="(Keyword,keywordIndex) in paperInfo.Paper_Keyword" :key="keywordIndex">
                    <a>{{Keyword.Keyword}}</a>
                  </li>
                </ul>
              </div>
            </section>
            <section class="fields">
              <h2>领域及档次</h2>
              <div class="detail_message">
                <ul>
                  <li v-for="(Domain,key,domainIndex) in paperInfo.Paper_Domain" :key="domainIndex">
                    {{key + '(' + Domain + ')'}}
                  </li>
                </ul>
              </div>
            </section>
            <section class="journal">
              <h2>所属刊物</h2>
              <div class="detail_message">
                <p>
                  {{paperInfo.Belong_Journal}}
                </p>
              </div>
            </section>
            <section class="line_chart">
              <h2>被引趋势</h2>
              <div class="detail_message" id="hot_canvasDiv">
                <Chart :id="id" :option="option"></Chart>
              </div>
            </section>
          </section>
          <section class="article_list">
            <header class="introduction_head">
              <h2 class="title">文章列表</h2>
              <ul>
                <li id="time_ordering" :class="{'active':isActive}" @click="timeOrder()">按时间排列</li>
                <li id="level_ordering" :class="{'active':!isActive}" @click="qualityOrder()">按档次排列</li>
              </ul>
            </header>
            <div class="paper_type">
              <a  class="type_button" :class="{'graybg':referOrCited}" id="Ref" type="button" @click="refer()">参考文献</a>
              <a  class="type_button" :class="{'graybg':!referOrCited}" id="Cite" type="button" @click="cited()">引证文献</a>
            </div>
            <div class="articlelists">
              <ul class="new_list">
                <li v-for="(Paper,paperIndex) in paperFinallyShow" :key="paperIndex">
                  <h3><span class="ar_year">{{Paper.Paper_Year}}</span><a href="#">
                    {{Paper.Paper_Title}}</a></h3>
                  <p class="ar_author"> <a v-for="(Author,authorIndex) in Paper.Paper_Author" :key="authorIndex">
                    {{Author.Author_Name + '(' + Author.Author_Level + ')'}}
                    </a></p>
                  <p class="ar_jour"><a>{{Paper.Paper_Journal + '(' + Paper.Journal_Level + ')'}}</a></p>
                  <p class="ar_domain">领域：<span v-for="(PaperDomainlv,PaperDomain,paperDomainIndex) in Paper.Paper_Domain" :key="paperDomainIndex">
                    {{PaperDomain}};</span></p>
                  <p class="ar_level">档次：<span>{{Paper.Paper_Level}}</span></p>
                  <div class="item_info">
                    <span class="high">{{Paper.Cited_High}}</span>
                    <span class="cite">{{Paper.Cited_Num}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="moreinformation" id="pagerArea" style="-moz-user-select:none;">
              <paginate
                v-model="page"
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="1"
                :click-handler="functionName"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :page-link-class="'page-link-item'"
                :prev-class="'ignore prev-item'"
                :prev-link-class="'prev-link-item'"
                :next-class="'ignore next-item'"
                :next-link-class="'next-link-item'"
                :disabled-class="'ignore disabled'">
              </paginate>
              <!-- <paginate
                v-model="page"
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="1"
                :click-handler="functionName"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'ui pagination menu'"
                :page-link-class="'item'"
                :prev-link-class="'item'"
                :next-link-class="'item'"
                :break-view-link-class="'break-view-link'"
                :no-li-surround="true"
                ></paginate> -->
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header'
  import Chart from '../common/Chart.vue';
  import axios from 'axios'
  export default {
    name: 'ArticleDetail',
    data() {
      return {
        isShowSearchbox: true,
        bg_mask: false,
        paperInfo: '',
        paperCited:'',
        paperRefer:'',
        paperFinally:'',
        paperFinallyShow:[],
        moreOrLess: true,
        id: '引用趋势',
        option: {},
        isActive:true,
        referOrCited:true,
        page:1,
        pageCount:5,
        pageSize:2,

      }
    },
    components: {
      Header,
      Chart
    },
    created() {
      this.getArticleInfo()
      
    },
    watch:{
      referOrCited:function(){
        this.timeOrder()
      },
    },
    methods: {
      getArticleInfo() {
        axios({
          url: 'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/articleDetail',
          method: 'get',
          params: {
            title: this.$route.params.title
          }
        }).then(response => {
          if (response.status == 200) {
            this.paperInfo = response.data
            this.drawChart()
            this.paperCited = this.paperInfo.Paper_Cited
            this.paperRefer = this.paperInfo.Paper_Refer
            this.timeOrder()
          }
        }).catch(error => {
          alert('服务器错误，无法获取数据')
        })
      },
      drawChart() {
        let yearObj = this.paperInfo.Cited_Yearly
        if (yearObj != '{}') {
          let year_list = [],num_list =[] ,high_list = []
          for(let key in yearObj){
            year_list.push(key)
            num_list.push(yearObj[key][0])
            high_list.push(yearObj[key][1])
          }

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
      },
      absAbbr() {
        this.moreOrLess = !this.moreOrLess
      },
      isMask() {
        this.bg_mask = true
      },
      timeOrder(){
        this.isActive = true
        this.paperFinallyShow = []
        this.page = 1
        if(!this.referOrCited){
          this.paperFinally = this.paperCited.sort(function(a, b){
             if(a.Paper_Year > b.Paper_Year) return -1;
             if(a.Paper_Year < b.Paper_Year) return 1;
             if(a.Paper_Year = b.Paper_Year){
                 a.Paper_Level.localeCompare(b.Paper_Level);
             }
             return 0;
         });
         this.pageCount = Math.ceil(this.paperFinally.length/2)
         this.initPaperData()
        }else{
           this.paperFinally = this.paperRefer.sort(function(a, b){
             if(a.Paper_Year > b.Paper_Year) return -1;
             if(a.Paper_Year < b.Paper_Year) return 1;
             if(a.Paper_Year = b.Paper_Year){
                 a.Paper_Level.localeCompare(b.Paper_Level);
             }
             return 0;
         });
         this.pageCount = Math.ceil(this.paperFinally.length/2)
         this.initPaperData()
        }
        
      },
      qualityOrder(){
        this.paperFinallyShow = []
        this.page = 1
        this.isActive = false
        if(!this.referOrCited){
          this.paperFinally = this.paperCited.sort(function(a, b) {
             if(a.Paper_Level.localeCompare(b.Paper_Level) != 0){
                 return a.Paper_Level.localeCompare(b.Paper_Level);//比较两篇文章的等级高低并返回排序
             }else {
                 if(a.Paper_Year > b.Paper_Year) return -1;
                 if(a.Paper_Year < b.Paper_Year) return 1;
                 return 0;
             }
         })
         this.pageCount = Math.ceil(this.paperFinally.length/2)
         this.initPaperData()
        }else{
           this.paperFinally = this.paperRefer.sort(function(a, b) {
             if(a.Paper_Level.localeCompare(b.Paper_Level) != 0){
                 return a.Paper_Level.localeCompare(b.Paper_Level);//比较两篇文章的等级高低并返回排序
             }else {
                 if(a.Paper_Year > b.Paper_Year) return -1;
                 if(a.Paper_Year < b.Paper_Year) return 1;
                 return 0;
             }
         })
         this.pageCount = Math.ceil(this.paperFinally.length/2)
         this.initPaperData()
        }
      },
      refer(){
        this.referOrCited = true
        this.paperFinallyShow = []
        this.page = 1
      },
      cited(){
        this.referOrCited = false
        this.paperFinallyShow = []
        this.page = 1
      },
      initPaperData(){
        for(let i=0;i<this.pageSize;i++){
           this.paperFinallyShow.push(this.paperFinally[i])
         }
      },
      functionName(pageNow){
        let pgaeNow = pageNow
        let pageSize = this.pageSize
        let paperLen = this.paperFinally.length
        this.paperFinallyShow = []
        if(pageNow*pageSize < paperLen){
          for(let i=(pgaeNow-1)*pageSize;i<pgaeNow*pageSize;i++){
            this.paperFinallyShow.push(this.paperFinally[i])
          }
        }else{
          for(let i=(pgaeNow-1)*pageSize;i<paperLen;i++){
            this.paperFinallyShow.push(this.paperFinally[i])
          }
        }
        console.log(this.paperFinallyShow)
      }
    },
    filters: {
      abstractAbbr(abs) {
        if (abs.length > 420) {
          let absAbbr = abs.substring(0, 420) + '...'
          return absAbbr
        } else {
          return abs
        }
      }
    }

  }

</script>

<style scoped>
  @import 'https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css';
  /* @import 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/components/menu.min.css'; */
  @import '../../assets/css/base.css';
  @import '../../assets/css/articleDetail.css';
</style>
