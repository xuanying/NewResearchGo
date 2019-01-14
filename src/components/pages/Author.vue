<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <div class="main">
        <div class="main_content">
            <section class="list_head">
                <!-- <span @click="tagHandler()">输入关键词</span>
                <div class="filter_div">
                    <input id="list_filter" name="filter" class="input" type="text">
                    <input type="button" value="">
                </div>
                <span id="change_word" @click="changePage()">换一批</span> -->
                 <div class="keyworddiv">
            <span id="change_word" @click="showKeywordMatchLevel()">关键词匹配度</span>
            <ul class="outside" v-show="isShowKeywordMatchLevel">
                            <li v-for="(keyword,keywordIndex) in keywordList" :key="keywordIndex">
                                <span @click="getAuthorByKeywordMatchLevel(keyword,keywordIndex)" >
                                  {{(keywordIndex+1)/keywordList.length*100 + '%' + '('+(keywordIndex+1)+'个关键词匹配)'}}
                                  </span>
                                
                            </li>
            </ul>
              
          </div>
            </section>
            <section class="jour_content">
                <div class="jour_part" v-for="(author,authorIndex) in authorInfo" :key="authorIndex">
                    <div class="part_left">
                        <h1 class="rankA"><a >{{author.authors}}</a></h1>
                        <p>所属机构名：
                            <ul class="institution">
                                <li>
                                    <span >{{author.institution}}</span>
                                </li>
                            </ul>
                            
                            </p>
                        <!-- <p style="display: inline-block;">关键词：</p> -->
                        <p>发表论文：</p>
                        <div class="paperTitleList">
                            <ul>
                                <li v-for="(paper,paperIndex) in author.papers" :key="paperIndex">《{{paper}}》</li>
                            </ul>
                        </div>
                        <p>文章数：</p>
                        <div>{{author.paperNum}}</div>
                        <!-- <div class="keyword_info">
                            <p v-for="(Mykeyword,mykeywordIndex) in JournalInfo.Rel_Keyword" :key="mykeywordIndex">
                                <span>{{Mykeyword.Keyword}}</span>占比<span>{{Mykeyword.Article_Num}}</span>
                                篇，同比增长<span>{{Mykeyword.Article_Trend}}</span>篇
                            </p>
                        </div> -->
                        <!-- <p style="display: inline-block;">我的好友：</p>
                        <div class="friend_info">
                            <p v-for="(MyFriend,myfriendIndex) in JournalInfo.Rel_Friend" :key="myfriendIndex">
                                <span>{{MyFriend.Author_Name}}</span>占比<span>{{MyFriend.Articles_Num}}</span>
                                篇，同比增长<span>{{MyFriend.Articles_Trend}}</span>篇
                            </p>
                        </div> -->
                    </div>
                    <div class="my_keywords" v-show="!isShowKeywordMatchLevel">
                        <!-- <tag-cloud :data="JournalInfo.Journal_Keyword" :config="tagConfig" @clickTag="clickTagItem"></tag-cloud> -->
                        <!-- <TagCloud :data="author.keywords" :config="tagConfig" @clickTag="clickTagItem"></TagCloud> -->
                        <wordcloud class="wordcloud"
                            :data="author.myKey"
                            nameKey="name"
                            valueKey="frequency"
                            :rotate="rotate"
                            :spiral="spiral"
                            :fontScale="fontScale"
                            :fontSize="fontSize"
                            :margin="margin"
                            :wordPadding="wordPadding"
                            :showTooltip="true"
                            :wordClick="wordClickHandler">
                        </wordcloud>
                    </div>
                </div>
            </section>
            <Pageination :total="totalAuthorRecord" :size="size" :page="authorPage" :changge="pageFn" :isUrl="true"></Pageination>
        </div>
            <div class="clear"></div>

    </div>
    </div>
</template>

<script>
import Header from '../common/Header'
import TagCloud from '../common/TagCloud'
import wordcloud from '../common/WordCloud'
import axios from 'axios'
import baseUrl from '@/serviceAPI.config.js'
import Pageination from '../common/Pageination'
import {
    setCookie,
    getCookie,
    delCookie,
    delAllCookie
  } from '@/tools/cookie.js'
    export default {
        name:'Contribute',
        data(){
            return{
                isShowSearchbox:true,
                authorInfo:'',
                bg_mask:false,
                tagData:[],
                lowjourIndex:0,
                upjourIndex:2,
                tagConfig:{'radius':110,'maxFont':30},
                keywordList:[],
                matchLevel:1,
                isShowKeywordMatchLevel:false,
                userId:28,
                token:'',
                authorPage:1,
                totalAuthorRecord:50,
                size:10,
                rotate:{from: -5, to: 5, numOfOrientation: 10 },
                spiral:'rectangular',
                fontScale:'n',
                fontSize:[8,50],
                wordPadding:10,
                margin:{top: -5, right: -5, bottom: -5, left: -5 },
            }
        },
        created(){
            this.getLoginInfo()
        },
        components:{
            Header,TagCloud,Pageination,wordcloud
        },
        methods:{
            getLoginInfo(){
                // let loginInfo = getCookie('loginData')
                // let loginInfoJson = JSON.parse(loginInfo)
                // this.token = loginInfoJson.token
                // this.userId = loginInfoJson.userId
                // this.getAuthorInfo()
            },
            // getKeywordList(){
            //     axios({
            //         url:baseUrl + '/api/getKeywordListById/'+this.userId,
            //         method:'get'
            //     }).then(response=>{
            //         if(response.status==200){
            //             this.keywordList=response.data
            //             this.getAuthorInfo()
            //         }
            //     }).catch(error=>{
            //         alert(error)
            //     })
            // },
            isMask(data){
            this.bg_mask = data
            },
            getAuthorInfo(){
                axios({
                    url: baseUrl + '/api/getRecommendedAuthor',
                    method: 'get',
                    params:{
                        userId:this.userId,
                        keywordNum:this.matchLevel,
                        start:this.authorPage-1
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if(response.data==null || response.data == ''){
                        alert("数据计算中，请稍后再试！")
                        }else{
                        this.authorInfo = response.data.content
                        this.totalAuthorRecord = response.data.totalNum
                        }
                    }
                }).catch(error => {
                    alert('服务器错误，获取数据失败')
                })
            },
            tagHandler(){
                let obj = {}
                this.authorInfo.forEach(author => {
                    author.keywords.forEach(keyword=>{
                        obj['name'] = keyword['name']
                        this.tagData.push(obj)
                    })
                })
                console.log(this.tagData)
            },
            clickTagItem(tag){
                this.$router.push({
                    name:'KeywordDetail'
                })
            },
            changePage(){
                if(this.upjourIndex == this.contributeInfo.length){
                    this.lowjourIndex = 0
                    this.upjourIndex = 2
                }else if(this.upjourIndex + 2 < this.contributeInfo.length){
                    this.lowjourIndex = this.upjourIndex
                    this.upjourIndex += 2
                }else{
                    this.lowjourIndex = this.upjourIndex
                    this.upjourIndex = this.contributeInfo.length
                }
            },
            toJournaDetail(journaName){
                // console.log(journaName)
                this.$router.push({
                    name:'JournaDetail'
                })
            },
            showKeywordMatchLevel(){
                this.isShowKeywordMatchLevel = true
            },
            getAuthorByKeywordMatchLevel(keyword,keywordIndex){
                this.matchLevel = keywordIndex + 1
                this.isShowKeywordMatchLevel = false
                this.getAuthorInfo()
            },
            pageFn(pageNum){
                this.authorPage = pageNum
                console.log("di" + pageNum + "ye")
                this.getAuthorInfo()
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            },
            wordClickHandler(name, value, vm) {
                // console.log('wordClickHandler', name, value, vm);
                alert('wordClickHandler' + name + value + 'vm:'+ vm)
            }
        }
}
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/author.css';
</style>