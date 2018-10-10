<template>
  <div @click="handlerDocumentClick">
    <div class="bg_mask" v-if="bg_mask"></div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="main_content">
        <div class="personal_messages">
          <section class="basic_information">
            <div class="portrait">
              <img src="../../assets/images/portrait2.png">
              <div class="con_box">
                <span class="concern" @click="concern()" v-show="isConcern">加关注</span>
                <span class="concern_already" v-if="!isConcern" @click="cancelConcern()">已关注</span>
                <span class="send_message">发私信</span>
              </div>
            </div>
            <div class="informations">
              <section class="information_head">
                <h1 class="name">{{authorInfo.Author_Name}}</h1>
              </section>
              <section class="field_rank">
                <div id="message_tip_field" class="message_tip"></div>
                <span class="level_title">领域(等级)：</span>
                <div class="fields_all">
                  <ul>
                    <li v-for="(value,domain,domainIndex) in authorInfo.Author_Domain" :key="domainIndex" @mouseover="showSubDomain(domain)"
                      @mouseout="hideSubDomain()">{{domain + '(' + authorInfo.Middle_R_Level[domain] + ')' |
                      fixBadData}}</li>
                  </ul>
                </div>
                <div id="layer" v-if="isLayerShow">
                  <ul>
                    <li v-for="(subDomain,subDomainIndex) in subDomainList" :key="subDomainIndex"> <span>{{subDomain}}
                        <span>top 5%</span></span> </li>
                  </ul>
                </div>
              </section>
              <section class="other_informations">
                <div class="level">
                  <span>Level：</span>
                  <span id="author_level">{{authorInfo.Author_Level}}</span>
                </div>
                <div class="org">
                  <span>所属机构：</span>
                  <span id="org">{{authorInfo.Author_Institution.Institution}}</span>
                </div>
                <div class="connection">
                  <span>联系方式：</span>
                  <ul>
                    <li v-if="isPhone"><img src="../../assets/images/phone.png"><span>{{phone}}</span></li>
                    <li v-if="isEmail"><img src="../../assets/images/email.png"><span>{{email}}</span></li>
                  </ul>
                </div>
                <div class="article_cite">
                  <span>高质量引用/引用：</span>
                  <span id="cited_num">{{authorInfo.Cited_High + '/' + authorInfo.Cited_Num}}</span>
                </div>
                <div class="article">
                  <span>A类文章/文章：</span>
                  <span id="article_num">{{authorInfo.Article_High + '/' + authorInfo.Article_Num}}</span>
                </div>
                <div class="webpage">
                  <span>个人主页：</span>
                  <span id="page"></span>
                </div>
                <div class="introduction" id="introduction">
                  <span>个人简介：</span>
                  <span id="introduction">{{authorInfo.Personal_Show.substring(0,20) + '. . .'}}</span>
                  <span id="int_more" @click="showMoreInf()">[更多]</span>
                  <div id="introduction_more" v-show="showMore">
                    <span class="out">
                      <span class="inner"></span>
                    </span>
                    <h2>个人简介</h2>
                    <span class="intro_more">{{authorInfo.Personal_Show}}</span>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section class="friendNet">
            <header class="introduction_head">
              <h2 class="title">好友关系网</h2>
            </header>

          </section>
          <section class="fans">
            <header class="main_content_head">
              <h2 class="title" :class="{'active':showConcernOrFans}" @click="showHisConcern()">TA的关注</h2>
              <h2 class="title" style="left: -12px" :class="{'active':!showConcernOrFans}" @click="showHisFans()">TA的粉丝</h2>
            </header>
            <ul class="concern_list" v-show="showConcernOrFans">
              <li>
                <img src="../../assets/images/signup1.jpg">
                <div class="list_info">
                  <h3><a href="#">Hua Li</a></h3>
                  <p>所属机构:<a href="">Shanghai Institute of Microsystem</a></p>
                </div>
                <div class="list_left">
                  <span style="display: none" class="add_con">＋加关注</span>
                  <span class="cancel_con">已关注</span>
                  <!-- <div class="list_inline">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
              <li>
                <img src="../../assets/images/signup2.jpg">
                <div class="list_info">
                  <h3><a href="#">Meimei Han</a></h3>
                  <p>所属机构:<a href="">UESTC</a></p>
                </div>
                <div class="list_left">
                  <span class="add_con">＋加关注</span>
                  <span class="cancel_con" style="display: none">已关注</span>
                  <!-- <div class="list_inline" style="display: none">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
              <li>
                <img src="../../assets/images/signup3.jpg">
                <div class="list_info">
                  <h3><a href="#">Lei Li</a></h3>
                  <p>所属机构:<a href="">ARM Inc.</a></p>
                </div>
                <div class="list_left">
                  <span class="add_con" style="display: none">＋加关注</span>
                  <span class="cancel_con">已关注</span>
                  <!-- <div class="list_inline">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
              <li>
                <img src="../../assets/images/signup4.jpg">
                <div class="list_info">
                  <h3><a href="#">Zichu Lu</a></h3>
                  <p>所属机构:<a href="">Beijing Institute of Computer Science</a></p>
                </div>
                <div class="list_left">
                  <span class="add_con">＋加关注</span>
                  <span class="cancel_con" style="display: none">已关注</span>
                  <!-- <div class="list_inline" style="display: none">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
            </ul>
            <ul class="fans_list" v-show="!showConcernOrFans">
              <li>
                <img src="../../assets/images/signup4.jpg">
                <div class="list_info">
                  <h3><a href="#">Zichu Lu</a></h3>
                  <p>所属机构:<a href="">Beijing Institute of Computer Science</a></p>
                </div>
                <div class="list_left">
                  <span class="add_con">＋加关注</span>
                  <span class="cancel_con" style="display: none">已关注</span>
                  <!-- <div class="list_inline" style="display: none">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
              <li>
                <img src="../../assets/images/signup1.jpg">
                <div class="list_info">
                  <h3><a href="#">Hua Li</a></h3>
                  <p>所属机构:<a href="">Shanghai Institute of Microsystem</a></p>
                </div>
                <div class="list_left">
                  <span class="add_con">＋加关注</span>
                  <span class="cancel_con" style="display: none">已关注</span>
                  <!-- <div class="list_inline" style="display: none">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
              <li>
                <img src="../../assets/images/signup3.jpg">
                <div class="list_info">
                  <h3><a href="#">Lei Li</a></h3>
                  <p>所属机构:<a href="">ARM Inc.</a></p>
                </div>
                <div class="list_left">
                  <span class="add_con">＋加关注</span>
                  <span class="cancel_con" style="display: none">已关注</span>
                  <!-- <div class="list_inline" style="display: none">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
              <li>
                <img src="../../assets/images/signup2.jpg">
                <div class="list_info">
                  <h3><a href="#">Meimei Han</a></h3>
                  <p>所属机构:<a href="">UESTC</a></p>
                </div>
                <div class="list_left">
                  <span class="add_con" style="display: none">＋加关注</span>
                  <span class="cancel_con">已关注</span>
                  <!-- <div class="list_inline">
                                    <label id="affirm">取消关注</label>
                                    <a href="#">发私信</a>
                                </div> -->
                </div>
              </li>
            </ul>
          </section>
          <!--<section class="self_introduction">-->
          <!--<header class="introduction_head">-->
          <!--<h2 class="title">个人简介</h2>-->
          <!--</header>-->
          <!--<p>这个人没有写个人简介</p>-->
          <!--</section>-->
          <section class="keywords_list">
            <header class="introduction_head">
              <h2 class="title">关键词</h2>
            </header>
            <div id="my_keywords">
              <TagCloud class="tagcloud" :data="handleKeywordData" :config="tagConfig" @clickTag="clickTagItem"></TagCloud>
            </div>
          </section>
          <section class="article_list">
            <header class="introduction_head">
              <h2 class="title">文章列表</h2>
              <ul>
                <li id="time_ordering" :class="{'active':timeOrQualityOrder}" @click="orderByTime()">按时间排列</li>
                <li id="level_ordering" :class="{'active':!timeOrQualityOrder}" @click="orderByQuality()">按档次排列</li>
              </ul>
            </header>
            <div class="articlelists">
              <ul class="new_list">
                <li v-for="(paper,paperIndex) in paperFinallyShow" :key="paperIndex">
                  <h3><span class="ar_year">{{paper.Paper_Year}}</span><a href="#">{{paper.Paper_Title}}</a></h3>
                  <p class="ar_author"> 
                      <a v-for="(value,author,authorIndex) in paper.Paper_Author" :key="authorIndex">{{author + '(' + value.Author_Level + ')'}}</a>
                  </p>
                  <p class="ar_jour"><a>{{paper.Paper_Journal + '(' + paper.Journal_Level + ')'}}</a></p>
                  <p class="ar_domain">领域：
                      <span v-for="(level,domain,domainIndex) in paper.Paper_Domain" :key="domainIndex">{{domain + '(' + level + ')'}}</span>
                  </p>
                  <p class="ar_level">档次：<span>{{paper.Paper_Level}}</span></p>
                  <div class="item_info">
                    <span class="high">{{paper.Cited_High}}</span>
                    <span class="cite">{{paper.Cited_Num}}</span>
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
  import TagCloud from '../common/TagCloud'
  import axios from 'axios'
  export default {
    data() {
      return {
        name: 'AuthorHomePage',
        isShowSearchbox: true,
        bg_mask: false,
        isConcern: true,
        authorInfo: '',
        isLayerShow: false,
        subDomainList: '',
        phone: '',
        email: '',
        isPhone: true,
        isEmail: true,
        showMore: false,
        showConcernOrFans: true,
        tagConfig: {
          'radius': 170,
          'maxFont': 30
        },
        handleKeywordData: [],
        timeOrQualityOrder: true,
        paperFinallyShow: [],
      }
    },
    created() {
      this.getAuthorInfo()
    },
    methods: {
      getAuthorInfo() {
        axios({
          url: 'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/authorHomePage',
          method: 'get'
        }).then(response => {
          if (response.status == 200) {
            this.authorInfo = response.data
            this.phone = response.data.Phone
            this.email = response.data.Author_Email
            if (this.phone == '') {
              this.isPhone = false
            }
            if (this.email == '') {
              this.isEmail = false
            }
            this.handleKeywordDatafunc()
            this.orderByTime()
          }
        }).catch(error => {
          alert(error)
        })
      },
      isMask(data) {
        this.bg_mask = data
      },
      concern() {
        this.isConcern = false
      },
      cancelConcern() {
        this.isConcern = true
      },
      showSubDomain(domain) {
        this.isLayerShow = true
        this.subDomainList = this.authorInfo.Author_Domain[domain]
      },
      hideSubDomain() {
        this.isLayerShow = false
      },
      showMoreInf(e) {
        this.showMore = true
      },
      handlerDocumentClick(event) {
        let sp = document.getElementById("introduction")
        if (sp) {
          if (!sp.contains(event.target)) {
            this.showMore = false
          }
        }
      },
      showHisConcern() {
        this.showConcernOrFans = true
      },
      showHisFans() {
        this.showConcernOrFans = false
      },
      clickTagItem(tag) {
        this.$router.push({
          name: 'KeywordDetail'
        })
      },
      handleKeywordDatafunc() {
        let keywordList = this.authorInfo.Author_Keyword
        keywordList.forEach(element => {
          let obj = {}
          obj['name'] = element
          this.handleKeywordData.push(obj)
        })
      },
      orderByTime() {
        this.timeOrQualityOrder = true
        this.paperFinallyShow = this.authorInfo.Author_Paper.sort(function (a, b) {
          if (a.Paper_Year > b.Paper_Year) return -1;
          if (a.Paper_Year < b.Paper_Year) return 1;
          if (a.Paper_Year = b.Paper_Year) {
            a.Paper_Level.localeCompare(b.Paper_Level);
          }
          return 0;
        })
      },
      orderByQuality() {
        this.timeOrQualityOrder = false
        this.paperFinallyShow = this.authorInfo.Author_Paper.sort(function (a,b) {
          if (a.Paper_Level.localeCompare(b.Paper_Level) != 0) {
            return a.Paper_Level.localeCompare(b.Paper_Level); //比较两篇文章的等级高低并返回排序
          } else {
            if (a.Paper_Year > b.Paper_Year) return -1;
            if (a.Paper_Year < b.Paper_Year) return 1;
            return 0;
          }
        })
      }
    },
    components: {
      Header,
      TagCloud
    },
    filters: {
      fixBadData(data) {
        let domainData = data.substring(0, data.length - 9)
        let levelData = data.substring(data.length - 4)
        let fineData = domainData + levelData
        return fineData
      }
    }

  }

</script>

<style scoped>
  @import '../../assets/css/base.css';
  @import '../../assets/css/authorHomepage.css';

</style>
