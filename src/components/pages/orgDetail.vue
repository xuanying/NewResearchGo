<template>
    <div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <div class="main">
            <div class="main_content">
                <div class="organization_messages">
                    <header class="org_logo_name">
                        <h1>
                            <img src="../../assets/images/org_logo.jpg">
                            {{orgInfo.Organization_name}}
                        </h1>
                    </header>
                    <button class="collection" type="button" name="CollectionFalse">收藏</button>
                    <section class="org_part_message">
                        <h2>国家与地区</h2>
                        <div class="detail_message" id="org_country">{{orgInfo.Country}}</div>
                    </section>
                    <section class="org_part_message">
                        <h2>文章数趋势</h2>
                        <div class="detail_message" id="hot_canvasDiv">
                            <Chart :id="id" :option="option" v-if="flag"></Chart>
                        </div>
                    </section>
                    <section class="org_part_message" id="org_domain">
                        <h2>研究领域</h2>
                        <div class="detail_message">
                            <ul id="org_domain" >
                                <li v-for="(domain,domainIndex) in orgInfo.Domain" :key="domainIndex">{{domain}}</li>
                            </ul>
                        </div>
                    </section>
                    <section class="org_part_message" id="masters">
                        <h2>知名学者</h2>
                        <div class="detail_message">
                            <!--<h3>COMPUTER SCIENCE, INFORMATION SYSTEMS</h3>-->
                            <ul id="org_scholar">
                               <li v-for="(scholarValue,scholarName,scholarIndex) in scholarList" :key="scholarIndex"><a>{{scholarName}}</a></li>
                            </ul>
                        </div>
                    </section>
                    <section class="org_part_message" id="hot_words">
                        <h2>热门关键词</h2>
                        <div class="detail_message">
                            <ul id="org_keyword">
                                <li v-for="(hotKeyword,keywordIndex) in hotKeyword" :key="keywordIndex"><a>{{hotKeyword}}</a></li>
                            </ul>
                        </div>
                    </section>
                    <section class="org_part_message" id="org_rank" >
                        <h2>世界排名</h2>
                        <div class="detail_message" id="r_world">{{worldRank}}</div>
                        <h2>全国排名</h2>
                        <div class="detail_message" id="r_country">{{countryRank}}</div>
                    </section>
                </div><!--organization_messages end-->
            </div><!--main_content end-->
        </div><!--main end-->
    </div>
</template>

<script>
import Header from '../common/Header'
import axios from 'axios'
import Chart from '../common/Chart'
    export default {
        name:'OrgDetail',
        data(){
            return{
                isShowSearchbox:true,
                bg_mask:false,
                orgInfo:'',
                scholarList:{},
                hotKeyword:[],
                worldRank:0,
                countryRank:0,
                id:'文章数趋势',
                option:{},
                flag:false,
            }
        },
        created(){
            this.getOrgInfo()
        },
        methods:{
            getOrgInfo(){
                axios({
                    url:'https://easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/orgDetail',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.orgInfo = response.data
                        let domain = this.orgInfo.Domain[0]
                        this.scholarList = this.orgInfo.Well_Know_Scholar[domain]
                        this.hotKeyword = this.orgInfo.Hot_Keyword[domain]
                        this.worldRank = this.orgInfo.Ranking_World[domain]
                        this.countryRank = this.orgInfo.Ranking_Country[domain]

                        this.drawChart()
                    }
                }).catch(error=>{
                    alert('服务器错误，获取数据失败')
                })
            },
            isMask(data){
                this.bg_mask = data
            },
                  drawChart() {
        let yearObj = this.orgInfo.Paper_Num
        if (yearObj != '{}') {
          let year_list = [],num_list =[] ,high_list = []
          for(let key in yearObj){
            year_list.push(key)
            num_list.push(yearObj[key][0])
            high_list.push(yearObj[key][1])
          }
          console.log(num_list)
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
        },
        components:{Header,Chart}
    }
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/orgDetail.css';
</style>