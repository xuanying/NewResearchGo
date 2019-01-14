<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <!-- <button id="test" style="position:fixed;right:0;bottom:0">回到顶部</button> -->
        <div class="main">
        <div class="main_content">
            <section class="rank_head">
                <div class="r_head">
                    <h1>排行榜</h1>
                    <div class="dmanu">
                        <span class="dmanu_head" @click="showKeywordMatchLevel()">关键词匹配度</span>
                        <ul class="outside" v-show="isShowKeywordMatchLevel">
                            <li v-for="(keyword,keywordIndex) in keywordList" :key="keywordIndex">
                                <span @click="getInfoByKeywordMatchLevel(keywordIndex+1)">
                                    {{(keywordIndex+1)/keywordList.length*100 + '%' + '('+(keywordIndex+1)+'个关键词匹配)'}}</span>
                                <!-- <ul class="inside">
                                    <li>a1</li>
                                    <li>a2</li>
                                    <li>a3</li>
                                    <li>a4</li>
                                </ul> -->
                            </li>
                            <!-- <li>
                                <span>b</span>
                                <ul class="inside">
                                    <li>b1</li>
                                    <li>b2</li>
                                    <li>b3</li>
                                    <li>b4</li>
                                    <li>b5</li>
                                </ul>
                            </li>
                            <li>
                                <span>c</span>
                                <ul class="inside">
                                    <li>c1</li>
                                    <li>c2</li>
                                    <li>c3</li>
                                    <li>c4</li>
                                </ul>
                            </li>
                            <li>
                                <span>d</span>
                                <ul class="inside">
                                    <li>d1</li>
                                    <li>d2</li>
                                    <li>d3</li>
                                    <li>d4</li>
                                    <li>d5</li>
                                </ul>
                            </li> -->
                        </ul>
                    </div>
                </div>
                <div class="r_nav">
                    <ul id="rank_typy">
                        <li :class="{'rSelected':isAuthorShow}" @click="showAuthorRank()">作者</li>
                        <li :class="{'rSelected':isJournalShow}" @click="showJournalRank()">刊物</li>
                        <li :class="{'rSelected':isOrgShow}" @click="showOrgRank()">机构</li>
                        <li :class="{'rSelected':isKeywordShow}" @click="showKeywordRank()">关键词</li>
                        <li :class="{'rSelected':isPaperShow}" @click="showPaperRank()">文章</li>
                        <li :class="{'rSelected':isNewbeeShow}" @click="showNewbeeRank()">新人</li>
                    </ul>
                </div>
            </section>
            <section class="rank_box">
                <div id="div_auth" v-show="isAuthorShow">
                    <table id="tb_auth" >
                        <thead>
                            <tr>
                                <th>排行</th>
                                <th>作者关键词</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(author,authorIndex) in authorInfo" :key="authorIndex">
                            <td>
                                <h3 class=""><a>{{authorIndex+1 + "." + author.authors}}</a></h3>
                                <div class="item_info">
                                    所属机构：
                                    <ul class="institution">
                                    <li>
                                        <span >{{author.institution}}</span>
                                    </li>
                                </ul>
                                </div>
                                
                                <div class="item_info">
                                    发表论文:
                                    <div class="paperTitleList">
                                        <ul>
                                            <li v-for="(paper,paperIndex) in author.papers" :key="paperIndex">《{{paper}}》</li>
                                        </ul>
                                    </div>
                                    <div class="item_info">
                                        文章数：<p style="display:inline-block">{{author.paperNum}}</p>
                                    </div>
                                    <!-- <span class="high">{{authorList.Author_All.Articles_High}}</span>
                                    <span class="paper_num">{{authorList.Author_All.Articles_Num}}</span><span class="divide">—</span>
                                    <span class="high_cite">{{authorList.Author_All.Cited_High}}</span>
                                    <span class="cite">{{authorList.Author_All.Cited_Num}}</span> -->
                                </div>
                            </td>
                            <td style="vertical-align:top">
                                <div class="item_info">
                                    <div class="keywordList">
                                        <ul>
                                            <li v-for="(keyword,keywordIndex) in author.mykeywords" :key="keywordIndex"><span>{{keyword.name}}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- <h3 class="rankR"><a >{{authorList.Author_Year.Author_Name}}</a></h3>
                                <div class="item_info">
                                    所属机构：{{authorList.Author_Year.Belong_Institution.Institution}}
                                </div>
                                <div class="item_info">
                                    <span class="high">{{authorList.Author_Year.Articles_High}}</span>
                                    <span class="paper_num">{{authorList.Author_Year.Articles_Num}}</span><span class="divide">—</span>
                                    <span class="high_cite">{{authorList.Author_Year.Cited_High}}</span>
                                    <span class="cite">{{authorList.Author_Year.Cited_Num}}</span>
                                </div> -->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <pageination :total="totalAuthor" :size="size" :page="authorPage" :changge="pageFn" :isUrl="true"></pageination>
                </div>
                <div id="div_jour" v-show="isJournalShow">
                    <table id="tb_jour">
                    <thead>
                        <tr>
                            <th>排行</th>
                            <th>高频关键词</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(journalArr,journalIndex) in journalInfo" :key="journalIndex">
                            <td>
                            <div class="item_info">
                                <h3><a>{{journalIndex + 1 + '.' + journalArr.journal}}</a></h3>
                            </div>
                            <div class="item_info">
                                <p>文章录用数：</p>
                                <ul class="citedNum">
                                    <li v-for="(num,year,yearIndex) in journalArr.article" :key="yearIndex">
                                        <span>{{num + '(' + year + ')'}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="item_info">
                                JCR影响因子:
                                <span class="jcr">{{journalArr.jCR}}</span>
                            </div>
                            </td>
                            <td>
                                <div class="item_info">
                                <div class="keywordList">
                                    <ul>
                                        <li v-for="(keyword,keywordIndex) in journalArr.keyWords" :key="keywordIndex">
                                            <span>{{keyword}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <pageination :total="totalJournal" :size="size" :page="journalPage" :changge="pageFn" :isUrl="true"></pageination>
                </div>
                
                <table id="tb_org" v-show="isOrgShow">
                    <thead>
                        <tr>
                            <th>总排行</th>
                            <th>年度排行</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(orgList,orgIndex) in handlerRankInfo.Institution" :key="orgIndex">
                        <td>
                            <h3><a href="#">{{orgList.Institution_All.Institution}}</a></h3>
                            <div class="item_info">
                                国家：{{orgList.Institution_All.Institution_Country}}
                            </div>
                        </td>
                        <td>
                           <h3><a href="#">{{orgList.Institution_Year.Institution}}</a></h3>
                            <div class="item_info">
                                国家：{{orgList.Institution_Year.Institution_Country}}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table id="tb_key" v-show="isKeywordShow">
                    <thead>
                        <tr>
                            <th>总排行</th>
                            <th>年度排行</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr v-for="(keywordList,keywordIndex) in handlerRankInfo.Keyword" :key="keywordIndex">
                        <td>
                            <h3><a href="#">{{keywordList.Keyword_All.Keyword}}</a></h3>
                            <div class="item_info">
                                作者：<span v-for="(relauthorList,relauthorIndex) in keywordList.Keyword_All.Rel_Author" :key="relauthorIndex">{{relauthorList.Author_Name}}</span>
                            </div>
                            <div class="item_info">
                                <span>文章：</span>
                                <ul>
                                    <li v-for="(relPaperList,relPaperIndex) in keywordList.Keyword_All.Rel_Paper" :key="relPaperIndex">{{relPaperList.Paper_Title}}</li>
                                </ul>
                            </div>
                            <div class="item_info">
                                <span class="high">{{keywordList.Keyword_All.Articles_High}}</span>
                                <span class="paper_num">{{keywordList.Keyword_All.Articles_Num}}</span>
                            </div>
                        </td>
                        <td>
                            <h3><a href="#">{{keywordList.Keyword_Year.Keyword}}</a></h3>
                            <div class="item_info">
                                作者：<span v-for="(relauthorList,relauthorIndex) in keywordList.Keyword_Year.Rel_Author" :key="relauthorIndex">{{relauthorList.Author_Name}}</span> 
                            </div>
                            <div class="item_info">
                                <span>文章：</span>
                                <ul>
                                    <li v-for="(relPaperList,relPaperIndex) in keywordList.Keyword_Year.Rel_Paper" :key="relPaperIndex">{{relPaperList.Paper_Title}}</li>
                                </ul>
                            </div>
                            <div class="item_info">
                                <span class="high">{{keywordList.Keyword_Year.Articles_High}}</span>
                                <span class="paper_num">{{keywordList.Keyword_Year.Articles_Num}}</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div id="div_pap" v-show="isPaperShow">
                    <table id="tb_pap" >
                    <thead>
                        <tr>
                            <th>排行</th>
                            <th>匹配关键词</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in paperInfo" :key="index">
                        <td>
                            <h3 class="rankA"><a href="#">{{ index +1 + '.' +item.Paper_Title}}</a></h3>
                            <div class="item_info">
                                <ul>
                                    <li v-for="(Author,index) in item.Paper_Author" :key="index+1000" style="display:inline-block">
                                        <span class="author">{{Author | paperAuthorClean}}</span>
                                    </li>
                                </ul>
                                 - <span>{{item.Paper_Year}}</span>
                            </div>
                            <div class="item_info">
                                <p class="se_jour"><a href="">{{item.ISSN}}</a></p>
                                <!-- {{item.Paper_Journal + '(' + item.Journal_Level + ')'}} -->
                                <!-- <span class="high_cite">{{paperList.Paper_All.Cited_High}}</span>
                                <span class="cite">{{paperList.Paper_All.Cited_Num}}</span> -->
                            </div>
                             <div class="item_info">
                                 <p>score:<a style="color:red">{{item.score}}</a></p>
                             </div>
                        </td>
                        <td style="vertical-align:top">
                            <p>与我相关：</p>
                            <p>
                                <label class="re_keyword" v-for="(Relkeyword,index) in item.keyWords" :key="index+10000">
                                <a> {{Relkeyword}}</a>
                                <!-- <span> {{Relkeyword.Rel_Level}} </span> -->
                                </label>
                            </p>
                            <!-- <h3 class="rankC"><a href="#">{{paperList.Paper_Year.Paper_Title}}</a></h3> -->
                            <!-- <div class="item_info">
                                <span class="author">{{paperList.Paper_Year.Paper_Author.Author_Name}}</span> - <span>{{paperList.Paper_All.Paper_Year}}</span>
                            </div>
                            <div class="item_info">
                                <span class="high_cite">{{paperList.Paper_Year.Cited_High}}</span>
                                <span class="cite">{{paperList.Paper_Year.Cited_Num}}</span>
                            </div> -->
                        </td>
                    </tr>
                    </tbody>
                    </table>
                    <pageination :total="totalPaper" :size="size" :page="paperPage" :changge="pageFn" :isUrl="true"></pageination>
                </div>
                
                <table id="tb_nauth" v-show="isNewbeeShow">
                    <thead>
                        <tr>
                            <th>总排行</th>
                            <th>年度排行</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(newbeeList,newbeeIndex) in handlerRankInfo.Newbee" :key="newbeeIndex">
                        <td>
                            <h3 class="rankR"><a href="#">{{newbeeList.Newbee_All.Author_Name}}</a></h3>
                            <div class="item_info">
                                所属机构：{{newbeeList.Newbee_All.Belong_Institution.Institution}}
                            </div>
                            <div class="item_info">
                                <span class="high">{{newbeeList.Newbee_All.Articles_High}}</span>
                                <span class="paper_num">{{newbeeList.Newbee_All.Articles_Num}}</span><span class="divide">—</span>
                                <span class="high_cite">{{newbeeList.Newbee_All.Cited_High}}</span>
                                <span class="cite">{{newbeeList.Newbee_All.Cited_Num}}</span>
                            </div>
                        </td>
                        <td>
                            <h3 class="rankR"><a href="#">{{newbeeList.Newbee_Year.Author_Name}}</a></h3>
                            <div class="item_info">
                                所属机构：{{newbeeList.Newbee_Year.Belong_Institution.Institution}}
                            </div>
                            <div class="item_info">
                                <span class="high">{{newbeeList.Newbee_Year.Articles_High}}</span>
                                <span class="paper_num">{{newbeeList.Newbee_Year.Articles_Num}}</span><span class="divide">—</span>
                                <span class="high_cite">{{newbeeList.Newbee_Year.Cited_High}}</span>
                                <span class="cite">{{newbeeList.Newbee_Year.Cited_Num}}</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
            
            <div class="clear"></div>
        </div>
    </div>
    </div>
</template>

<script>
import Header from '../common/Header'
import Pageination from '../common/Pageination'
import axios from 'axios'
import {
    setCookie,
    getCookie,
    delCookie,
    delAllCookie
  } from '@/tools/cookie.js'
  import baseUrl from '@/serviceAPI.config.js'
    export default {
        name:'Rank',
        data(){
            return{
                isShowSearchbox:true,
                bg_mask:false,
                rankInfo:'',
                handlerRankInfo:'',
                flag:false,
                isAuthorShow:true,
                isJournalShow:false,
                isOrgShow:false,
                isKeywordShow:false,
                isPaperShow:false,
                isNewbeeShow:false,
                midFields:'',
                journalRankData:'',
                isShowKeywordMatchLevel:false,
                keywordList:[],
                nowWhichShow:'author',
                token:'',
                userId:28,
                paperMatchlevel:2,
                authorMatchlevel:1,
                journalMatchlevel:2,
                paperInfo:'',
                authorInfo:'',
                journalInfo:'',
                authorPage:0,
                journalPage:0,
                paperPage:0,
                totalAuthor:0,
                totalPaper:0,
                totalJournal:0,
                size:10,

            }
        },
        created(){
            //下拉刷新
        //     var self = this
        //     $(window).scroll(function () {
        //     let scrollTop = $(this).scrollTop()
        //     let scrollHeight = $(document).height()
        //     let windowHeight = $(this).height()
        //     if (scrollTop + windowHeight === scrollHeight){
        //         console.log("到底了")
        //     }
        // }),
            this.getLoginInfo()
        },
        methods:{
            getLoginInfo(){
                // let loginInfo = getCookie('loginData')
                // let loginInfoJson = JSON.parse(loginInfo)
                // this.token = loginInfoJson.token
                // this.userId = loginInfoJson.userId
                this.getKeyword()
            },
            getKeyword(){
                let url = baseUrl + '/api/getKeywordListById/' + this.userId
                // console.log(url)
                axios({
                url:url,
                method:'get',
                headers:{
                    // 'Content-type':' application/json',
                    'Authorization':this.token
                }
                }).then(response=>{
                if(response.status==200){
                    this.keywordList = response.data
                    // console.log(response.data + "keywordlist")
                    // this.getAuthorInfo()
                }
                }).catch(error=>{
                    alert(error)
                })
            },
            getRankInfo(){
                axios({
                    url:'https://easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/rank',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.rankInfo = response.data
                        this.dataHandler()
                    }
                }).catch(error=>{
                    alert('服务器错误，获取数据失败' + error)
                })
            },
            // getMinField(){
            //     axios({
            //         url:'http://192.168.1.114:8222/api/getAllDomains',
            //         method:'get'
            //     }).then(response=>{
            //         if(response.status == 200){
            //             this.midFields = response.data
            //             console.log(response.data)
            //             this.getJournalRankInit();
            //         }
            //     })
            // },
            getJournalRankInit(){
                let midfieldinit = this.midFields[0]
                let midfieldurl = "http://192.168.1.114:8222/api/getJournal_Rank/" + midfieldinit
                axios({
                    url:midfieldurl,
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.journalRankData = response.data
                    }
                })
            },
            // getRankByMidfield(midfield){
            //     console.log("success" + midfield)
            //     let midfieldurl = "http://192.168.1.114:8222/api/getJournal_Rank/" + midfield
            //     axios({
            //         url:midfieldurl,
            //         method:'get'
            //     }).then(response=>{
            //         if(response.status == 200){
            //             this.journalRankData = response.data
            //             console.log(response.data[0].journal)
            //         }
            //     })
            // },
            isMask(data){
                this.bg_mask = data
            },
            dataHandler(){
                let data = this.rankInfo
                let authorYearList,authorAllList,journalYearList,journalAllList,institutionYearList,institutionAllList,
                keywordYearList,keywordAllList,paperYearList,paperAllList,newbeeYearList,newbeeAllList
                let arrYear = [],arrAll=[],arrYearKey=[],arrAllKey=[]
                let k = 0
                for(let key in data){
                    if(k%2 == 0){
                        arrYear.push(data[key])
                        arrYearKey.push(key)
                    }else{
                        arrAll.push(data[key])
                        arrAllKey.push(key)
                    }
                    k++
                }
                let info={},arr=[]
                for(let i = 0;i < arrYear.length;i++){
                    arr=[]
                    for(let j = 0;j < arrYear[i].length;j++){
                        let obj = {}
                        obj[arrYearKey[i]] = arrYear[i][j]
                        obj[arrAllKey[i]] = arrAll[i][j]
                        arr.push(obj)
                    }
                    info[arrYearKey[i].slice(0,arrYearKey[i].length - 5)] = arr
                }
                this.handlerRankInfo = info
                // console.log(this.handlerRankInfo)
                this.flag = true
            },
            showAuthorRank(){
                this.isAuthorShow = true
                this.isJournalShow = false
                this.isOrgShow = false
                this.isKeywordShow = false
                this.isPaperShow = false
                this.isNewbeeShow = false
                this.nowWhichShow = 'author'
                this.authorPage = 1
                this.getAuthorInfo()
            },
            getAuthorInfo(){
                axios({
                    url:baseUrl + '/api/getAuthorRank',
                    method:'get',
                    params:{
                        userId:this.userId,
                        keywordNum:this.authorMatchlevel,
                        start:this.authorPage-1
                    }
                }).then(response=>{
                    if(response.status == 200){
                        if(response.data.length == 1 && response.data[0].userID ==-1){
                            alert("正在处理数据，请稍后再试！")
                        }else{
                            console.log('balalalallala' + response.data)
                            this.authorInfo = response.data.content
                            this.totalAuthor = response.data.totalNum
                        } 
                        // console.log(this.authorInfo[0].institution[0] + "authorInfo")
                        // this.tagHandler()
                    }
                }).catch(error=>{
                    alert('服务器错误，数据获取失败')
                })
            },
            showJournalRank(){
                this.isAuthorShow = false
                this.isJournalShow = true
                this.isOrgShow = false
                this.isKeywordShow = false
                this.isPaperShow = false
                this.isNewbeeShow = false
                this.nowWhichShow = 'journal'
                this.journalPage = 1
                this.getJournalInfo()
            },
            getJournalInfo(){
                axios({
                    url:baseUrl + '/api/getJournalRank',
                    method:'get',
                    params:{
                        userId:this.userId,
                        keywordNum:this.authorMatchlevel,
                        start:this.journalPage-1
                    }
                }).then(response=>{
                    if(response.status == 200){
                        if(response.data.length == 1 && response.data[0].userID==-1){
                            alert("正在处理数据，请稍后再试！")
                        }else{
                            this.journalInfo = response.data.content
                            this.totalJournal = response.data.totalNum
                        } 
                        // this.tagHandler()
                    }
                }).catch(error=>{
                    alert('服务器错误，数据获取失败')
                })
            },
            showOrgRank(){
                this.isAuthorShow = false
                this.isJournalShow = false
                this.isOrgShow = true
                this.isKeywordShow = false
                this.isPaperShow = false
                this.isNewbeeShow = false
            },
            showKeywordRank(){
                this.isAuthorShow = false
                this.isJournalShow = false
                this.isOrgShow = false
                this.isKeywordShow = true
                this.isPaperShow = false
                this.isNewbeeShow = false
            },
            showPaperRank(){
                this.isAuthorShow = false
                this.isJournalShow = false
                this.isOrgShow = false
                this.isKeywordShow = false
                this.isPaperShow = true
                this.isNewbeeShow = false
                this.nowWhichShow = 'paper'
                this.paperPage = 1
                this.getPaperInfo()
            },
            getPaperInfo() {
                console.log('getPaperInfo')
                axios({
                url: baseUrl + '/api/getPaperRank',
                method: 'get',
                params:{
                    userId:this.userId,
                    keywordNum:this.paperMatchlevel,
                    start:this.paperPage-1
                },
                headers:{
                    // 'Content-type':' application/json',
                    'Authorization':this.token
                }
                }).then(response => {
                if (response.status == 200) {
                    if(response.data.length == 1 && response.data[0].userID==-1){
                            alert("正在处理数据，请稍后再试！")
                        }else{
                            this.paperInfo = response.data.content
                            this.totalPaper = response.data.totalNum
                        }
                }
                }).catch(error => {
                    alert('服务器错误，获取数据失败')
                })
            },
            showNewbeeRank(){
                this.isAuthorShow = false
                this.isJournalShow = false
                this.isOrgShow = false
                this.isKeywordShow = false
                this.isPaperShow = false
                this.isNewbeeShow = true
            },
            showKeywordMatchLevel(){
                this.isShowKeywordMatchLevel = true
            },
            getInfoByKeywordMatchLevel(matchlevel){
                this.isShowKeywordMatchLevel = false
                if(this.nowWhichShow == 'paper'){
                    this.paperMatchlevel = matchlevel
                    this.getPaperInfo()
                }else if(this.nowWhichShow == 'author'){
                    this.authorMatchlevel = matchlevel
                    this.getAuthorInfo()
                }else if(this.nowWhichShow=='journal'){
                    this.journalMatchlevel =matchlevel
                    this.getJournalInfo()
                }

            },
            //分页
            pageFn(val){
                console.log("第" + val + "页")
                if(this.nowWhichShow == 'paper'){
                    this.paperPage = val
                    this.getPaperInfo()
                }else if(this.nowWhichShow == 'author'){
                    this.authorPage = val
                    this.getAuthorInfo()
                }else if(this.nowWhichShow=='journal'){
                    this.journalPage = val
                    this.getJournalInfo()
                }
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            }
        },
        components:{Header,Pageination},
        filters:{
            paperAuthorClean(authorname){
                let name = authorname.split("!");
                return name[0]
            }
        }
    }
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/search.css';
@import '../../assets/css/rank.css';
</style>