<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <div class="main">
        <div class="main_content">
            <section class="list_head">
                <span>输入关键词</span>
                <div class="filter_div">
                    <input id="list_filter" name="filter" class="input" type="text">
                    <input type="button" value="">
                </div>
                <span id="change_word" @click="changePage()">换一批</span>
            </section>
            <section class="jour_content">
                <div class="jour_part" v-for="(JournalInfo,journalIndex) in contributeInfo" :key="journalIndex"
                v-show="journalIndex >= lowjourIndex && journalIndex < upjourIndex">
                    <div class="part_left">
                        <h1 class="rankA"><a href="">{{JournalInfo.Journal}}</a></h1>
                        <p>录用数：高于同档次平均<span>{{JournalInfo.Journal_Trend}}</span></p>
                        <p style="display: inline-block;">我的关键词：</p>
                        <div class="keyword_info">
                            <p v-for="(Mykeyword,mykeywordIndex) in JournalInfo.Rel_Keyword" :key="mykeywordIndex">
                                <span>{{Mykeyword.Keyword}}</span>占比<span>{{Mykeyword.Article_Num}}</span>
                                篇，同比增长<span>{{Mykeyword.Article_Trend}}</span>篇
                            </p>
                        </div>
                        <p style="display: inline-block;">我的好友：</p>
                        <div class="friend_info">
                            <p v-for="(MyFriend,myfriendIndex) in JournalInfo.Rel_Friend" :key="myfriendIndex">
                                <span>{{MyFriend.Author_Name}}</span>占比<span>{{MyFriend.Articles_Num}}</span>
                                篇，同比增长<span>{{MyFriend.Articles_Trend}}</span>篇
                            </p>
                        </div>
                    </div>
                    <div class="my_keywords">
                        <!-- <tag-cloud :data="JournalInfo.Journal_Keyword" :config="tagConfig" @clickTag="clickTagItem"></tag-cloud> -->
                        <TagCloud :data="JournalInfo.Journal_Keyword" :config="tagConfig" @clickTag="clickTagItem"></TagCloud>
                    </div>
                </div>
            </section>
        </div>
            <div class="clear"></div>
    </div>
    </div>
</template>

<script>
import Header from '../common/Header'
import TagCloud from '../common/TagCloud'
import axios from 'axios'
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
                tagConfig:{'radius':130,'maxFont':30}
            }
        },
        created(){
            this.getContributeInfo()
        },
        components:{
            Header,TagCloud
        },
        methods:{
            isMask(data){
            this.bg_mask = data
            },
            getContributeInfo(){
                axios({
                    url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/contribute',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.contributeInfo = response.data
                        this.tagHandler()
                    }
                }).catch(error=>{

                })
            },
            tagHandler(){
                console.log(this.contributeInfo)
                this.contributeInfo.Journal_Keyword.forEach(element => {
                    this.tagData.push('name',element)
                });
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
            }
        }
}
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/contribute.css';
</style>