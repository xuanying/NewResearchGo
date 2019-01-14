<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <div class="main">
        <div class="main_content">
            <!-- <section class="list_head">
                <span @click="tagHandler()">输入关键词</span>
                <div class="filter_div">
                    <input id="list_filter" name="filter" class="input" type="text">
                    <input type="button" value="">
                </div>
                <span id="change_word" @click="changePage()">换一批</span>
            </section> -->
            <section class="jour_content">
                <div class="jour_part" v-for="(JournalInfo,journalIndex) in contributeInfo" :key="journalIndex">
                    <div class="part_left">
                       <div class="item_info">
                                <h3><a>{{journalIndex + 1 + '.' + JournalInfo.journal}}</a></h3>
                            </div>
                            <div class="item_info">
                                <p>文章录用数：</p>
                                <ul class="citedNum">
                                    <li v-for="(num,year,yearIndex) in JournalInfo.article" :key="yearIndex">
                                        <span>{{num + '(' + year + ')'}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="item_info">
                                JCR影响因子:
                                <span class="jcr">{{JournalInfo.jCR}}</span>
                            </div>
                    </div>
                    <div class="my_keywords">
                        <!-- <tag-cloud :data="JournalInfo.Journal_Keyword" :config="tagConfig" @clickTag="clickTagItem"></tag-cloud> -->
                        <!-- <TagCloud :data="JournalInfo.Journal_Keyword" :config="tagConfig" @clickTag="clickTagItem"></TagCloud> -->
                         <wordcloud class="wordcloud"
                            :data="JournalInfo.myKeyWords"
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
            <Pageination :total="totalJournalRecord" :size="size" :page="journalPage" :changge="pageFn" :isUrl="true"></Pageination>
        </div>
            <div class="clear"></div>
    </div>
    </div>
</template>

<script>
import Header from '../common/Header'
import TagCloud from '../common/TagCloud'
import Pageination from '../common/Pageination'
import wordcloud from '../common/WordCloud'
import axios from 'axios'
import {
    setCookie,
    getCookie,
    delCookie,
    delAllCookie
  } from '@/tools/cookie.js'
  import baseUrl from '@/serviceAPI.config.js'
    export default {
        name:'Contribute',
        data(){
            return{
                isShowSearchbox:true,
                contributeInfo:'',
                bg_mask:false,
                tagData:[],
                lowjourIndex:0,
                upjourIndex:2,
                tagConfig:{'radius':110,'maxFont':30},
                matchLevel:1,
                userId:28,
                totalJournalRecord:50,
                journalPage:1,
                size:10,
                partRightKeywordList:[],
                rotate:{from: -5, to: 5, numOfOrientation: 10 },
                spiral:'rectangular',
                fontScale:'log',
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
                // this.getPaperInfo()
            },
            isMask(data){
            this.bg_mask = data
            },
            getContributeInfo(){
                axios({
                    url: baseUrl + '/api/getRecommendedJournal',
                    method: 'get',
                    params:{
                        userId:this.userId,
                        keywordNum:this.matchLevel,
                        start:this.journalPage-1
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if(response.data==null || response.data == ''){
                        alert("数据计算中，请稍后再试！")
                        }else{
                        this.contributeInfo = response.data.content
                        this.totalJournalRecord = response.data.totalNum
                        }
                    }
                }).catch(error => {
                    alert('服务器错误，获取数据失败')
                })
            },
            tagHandler(){
                console.log( this.contributeInfo[0].Journal_Trend)
                let obj = {}
                this.contributeInfo.forEach(journal => {
                    journal.Journal_Keyword.forEach(keyword=>{
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
            pageFn(pageNum){
                this.journalPage = pageNum
                console.log("di" + pageNum + "ye")
                this.getContributeInfo()
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
@import '../../assets/css/contribute.css';
#testWordCloud{
    width: 300px;
    height: 300px;
    border: 1px solid red;
}
</style>