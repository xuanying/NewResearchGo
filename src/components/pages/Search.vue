<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <div class="main">
        <div class="main_content">
            <section class="search_result">
               <div>
                   <p class="first_line">包含<span class="se_content">{{searchInfo.Search_Word}}</span>的文章结果约有<span class="se_number">{{searchInfo.Paper_Num}}</span>条</p>
                   <p class="second_line"><span class="se_title">{{searchInfo.Paper_List[0].Paper_Title}}</span></p>
                   <span class="more" id="mo_author" @click="showPaper()">More...</span>
               </div>
               <div>
                   <p class="first_line">包含<span class="se_content">{{searchInfo.Search_Word}}</span>的作者结果约有<span class="se_number">{{searchInfo.Author_Num}}</span>条</p>
                   <p class="second_line"><span class="se_content">{{searchInfo.Search_Word}}</span> <span>{{searchInfo.Author_List[0].Full_Name}}</span> 文章数：<span>{{searchInfo.Author_List[0].Articles_Num}}</span> 被引用数：<span>{{searchInfo.Author_List[0].Cited_Num}}</span></p>
                   <span class="more" id="mo_keyword" @click="showAuthor()">More...</span>
               </div>
               <div>
                   <p class="first_line">包含<span class="se_content">{{searchInfo.Search_Word}}</span>的关键词结果约有<span class="se_number">{{searchInfo.Keyword_Num}}</span>条</p>
                   <p class="second_line"><span class="se_content">{{searchInfo.Search_Word}}</span> <span>{{searchInfo.Keyword_List[0].Keyword}}</span> 文章数：<span>{{searchInfo.Keyword_List[0].Articles_Num}}</span> 被引用数：<span>{{searchInfo.Keyword_List[0].Cited_Num}}</span></p>
                   <span class="more" id="mo_paper" @click="showKeyword()">More...</span>
               </div>
            </section>
            <section class="result_box" id="result_paper" v-show="isShowPaper">
                <div class="re_block" v-for="(paper,paperIndex) in searchInfo.Paper_List" :key="paperIndex">
                    <span class="se_year">{{paper.Paper_Year}}</span>
                    <h1><a href="">{{paper.Paper_Title}}</a></h1>
                    <p class="se_author">
                        <a v-for="(value,author,authorIndex) in paper.Paper_Author" :key="authorIndex">{{author + '(' + value.Author_Level + ')'}}</a>
                    </p>
                    <p class="se_jour"><a href="">{{paper.Paper_Journal + '(' + paper.Journal_Level + ')'}}</a></p>
                    <p class="se_abs"><span class="se_type">摘要</span>{{paper.Paper_Abstract}}<span class="abs_more">(More)</span></p>
                    <div class="se_relate" title="与我相关">
                        <img src="../../assets/images/about.png">
                        <p class="re_keyword">我的方向：<a v-for="(relKeyword,relKeywordIndex) in paper.Rel_Keyword" :key="relKeywordIndex">{{relKeyword.Keyword}}<span>{{relKeyword.Rel_Level}}</span></a></p>
                        <p class="re_author">我的好友：<a v-for="(value,friend,friendIndex) in paper.Rel_Friend" :key="friendIndex">{{friend}}<span>{{value.Rel_Level}}</span></a></p>
                    </div>
                </div>
            </section>
            <section class="result_box" id="result_author" v-show="isShowAuther">
                <div class="re_block au_block" v-for="(author,authorIndex) in searchInfo.Author_List" :key="authorIndex">
                    <h1 class="rankR"><a href="">{{author.Full_Name}}</a></h1>
                    <p> 联系方式:<span>{{author.Author_Email}}</span></p>
                    <p> 所属机构:<a href="">{{author.Belong_Institution.Institution}}</a></p>
                    <p class="ar_domain">领域:<span v-for="(domain,domainIndex) in searchInfo.Author_Domain" :key="domainIndex">{{domain}}</span></p>
                    <div class="item_info">
                        <span class="high">{{author.Articles_High}}</span>
                        <span class="paper_num">{{author.Articles_Num}}</span><span class="divide">—</span>
                        <span class="high_cite">{{author.Cited_High}}</span>
                        <span class="cite">{{author.Cited_Num}}</span>
                    </div>
                </div>
            </section>
            <section class="result_box" id="result_keyword" v-show="isShowKeyword">
                <table>
                    <tr v-for="(trKeyword,trKeywordIndex) in keywordData" :key="trKeywordIndex">
                        <td v-for="(keyword,keywordIndex) in trKeyword" :key="keywordIndex">
                            <div class="re_block ke_block">
                                <h1><a href="">{{keyword.Keyword}}</a></h1>
                                <div class="item_info">
                                    <span class="high">{{keyword.Articles_High}}</span>
                                    <span class="paper_num">{{keyword.Articles_Num}}</span><span class="divide">—</span>
                                    <span class="high_cite">{{keyword.Cited_High}}</span>
                                    <span class="cite">{{keyword.Cited_Num}}</span>
                                </div>
                                <div class="ke_rank">
                                    <img src="../../assets/images/rank.png">
                                    <ul>
                                        <li v-for="(author,authorIndex) in keyword.High_Author" :key="authorIndex"><span>{{authorIndex + 1}}</span><a href="#">{{author.Full_Name}}</a>
                                            <p>文章数:{{author.Paper_Num}}</p></li>
                                    </ul>
                                </div>
                            </div>
                        </td> 
                    </tr>
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
        name:'Search',
        data(){
            return{
                isShowSearchbox:true,
                bg_mask:false,
                searchInfo:'',
                isShowPaper:true,
                isShowAuther:false,
                isShowKeyword:false,
                keywordData:'',
            }
        },
        created(){
            this.getSearchInfo()
        },
        methods:{
            isMask(data){
                this.bg_mask = data
            },
            getSearchInfo(){
                axios({
                    url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/search',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.searchInfo = response.data
                        // console.log(this.searchInfo)
                        this.handlerKeywordData()
                    }
                }).catch(error=>{
                    alert(error)
                })
            },
            showPaper(){
                this.isShowPaper = true
                this.isShowAuther = false
                this.isShowKeyword = false
            },
            showAuthor(){
                this.isShowPaper = false
                this.isShowAuther = true
                this.isShowKeyword = false
            },
            showKeyword(){
                this.isShowPaper = false
                this.isShowAuther = false
                this.isShowKeyword = true
            },
            handlerKeywordData(){
                let arr = [],arr1 = [],arr2 = []
                arr2 = this.searchInfo.Keyword_List
                for(let i = 0;i<arr2.length;i++){
                    arr1 = []
                    arr1[0] = arr2[i]
                    arr1[1] = arr2[++i]
                    arr[Math.floor(i/2)] = arr1
                }
                this.keywordData = arr
            }
        },
        components:{Header}
    }
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/search.css';
</style>