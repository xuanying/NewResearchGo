<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <div class="main">
        <div class="main_content">
            <section class="rank_head">
                <div class="r_head">
                    <h1>排行榜</h1>
                    <div class="dmanu">
                        <span class="dmanu_head">领域</span>
                        <ul class="outside" >
                            <li v-for="(midfield,midfieldindex) in midFields" :key="midfieldindex">
                                <span @click="getRankByMidfield(midfield)">{{midfield}}</span>
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
                <table id="tb_auth" v-show="isAuthorShow">
                    <thead>
                        <tr>
                            <th>总排行</th>
                            <th>年度排行</th>
                        </tr>
                    </thead>
                    <tbody v-if="flag">
                        <tr v-for="(authorList,authorIndex) in handlerRankInfo.Author" :key="authorIndex">
                        <td>
                            <h3 class="rankR"><a>{{authorList.Author_All.Author_Name}}</a></h3>
                            <div class="item_info">
                                所属机构：{{authorList.Author_All.Belong_Institution.Institution}}
                            </div>
                            <div class="item_info">
                                <span class="high">{{authorList.Author_All.Articles_High}}</span>
                                <span class="paper_num">{{authorList.Author_All.Articles_Num}}</span><span class="divide">—</span>
                                <span class="high_cite">{{authorList.Author_All.Cited_High}}</span>
                                <span class="cite">{{authorList.Author_All.Cited_Num}}</span>
                            </div>
                        </td>
                        <td>
                            <h3 class="rankR"><a >{{authorList.Author_Year.Author_Name}}</a></h3>
                            <div class="item_info">
                                所属机构：{{authorList.Author_Year.Belong_Institution.Institution}}
                            </div>
                            <div class="item_info">
                                <span class="high">{{authorList.Author_Year.Articles_High}}</span>
                                <span class="paper_num">{{authorList.Author_Year.Articles_Num}}</span><span class="divide">—</span>
                                <span class="high_cite">{{authorList.Author_Year.Cited_High}}</span>
                                <span class="cite">{{authorList.Author_Year.Cited_Num}}</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table id="tb_jour" v-show="isJournalShow">
                    <thead>
                        <tr>
                            <th>总排行</th>
                            <th>年度排行</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(journalList,journalIndex) in journalRankData" :key="journalIndex">
                            <td>
                            <div>
                                <em class="journalRank">{{journalIndex + 1}}.</em>
                                <h3 class="rankA"><a href="#">{{journalList.journal}}</a></h3>
                                <em class="jourRankScore">score:{{journalList.score}}</em>
                            </div>
                            </td>
                            <!-- <td>
                                <h3 class="rankB"><a href="#">{{journalList.Journal_Year.Journal}}</a></h3>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
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
                <table id="tb_pap" v-show="isPaperShow">
                    <thead>
                        <tr>
                            <th>总排行</th>
                            <th>年度排行</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(paperList,paperIndex) in handlerRankInfo.Paper" :key="paperIndex">
                        <td>
                            <h3 class="rankA"><a href="#">{{paperList.Paper_All.Paper_Title}}</a></h3>
                            <div class="item_info">
                                <span class="author">{{paperList.Paper_All.Paper_Author.Author_Name}}</span> - <span>{{paperList.Paper_All.Paper_Year}}</span>
                            </div>
                            <div class="item_info">
                                <span class="high_cite">{{paperList.Paper_All.Cited_High}}</span>
                                <span class="cite">{{paperList.Paper_All.Cited_Num}}</span>
                            </div>
                        </td>
                        <td>
                            <h3 class="rankC"><a href="#">{{paperList.Paper_Year.Paper_Title}}</a></h3>
                            <div class="item_info">
                                <span class="author">{{paperList.Paper_Year.Paper_Author.Author_Name}}</span> - <span>{{paperList.Paper_All.Paper_Year}}</span>
                            </div>
                            <div class="item_info">
                                <span class="high_cite">{{paperList.Paper_Year.Cited_High}}</span>
                                <span class="cite">{{paperList.Paper_Year.Cited_Num}}</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
import axios from 'axios'
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
            }
        },
        created(){
            this.getRankInfo()
            this.getMinField()
        },
        methods:{
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
            getMinField(){
                axios({
                    url:'http://192.168.1.129:8080/api/getAllDomains',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.midFields = response.data
                        console.log(response.data)
                        this.getJournalRankInit();
                    }
                })
            },
            getJournalRankInit(){
                let midfieldinit = this.midFields[0]
                let midfieldurl = "http://192.168.1.129:8080/api/getJournal_Rank/" + midfieldinit
                axios({
                    url:midfieldurl,
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.journalRankData = response.data
                    }
                })
            },
            getRankByMidfield(midfield){
                console.log("success" + midfield)
                let midfieldurl = "http://192.168.1.129:8080/api/getJournal_Rank/" + midfield
                axios({
                    url:midfieldurl,
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.journalRankData = response.data
                        console.log(response.data[0].journal)
                    }
                })
            },
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
            },
            showJournalRank(){
                this.isAuthorShow = false
                this.isJournalShow = true
                this.isOrgShow = false
                this.isKeywordShow = false
                this.isPaperShow = false
                this.isNewbeeShow = false
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
            },
            showNewbeeRank(){
                this.isAuthorShow = false
                this.isJournalShow = false
                this.isOrgShow = false
                this.isKeywordShow = false
                this.isPaperShow = false
                this.isNewbeeShow = true
            }
        },
        components:{Header}
    }
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/rank.css';
</style>