<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
        <div class="main">
        <div class="main_content">
            <div class="personal_messages">
                <section class="basic_information">
                    <div class="portrait">
                        <img src="../../assets/images/portrait2.png">
                        <div class="con_box">
                            <span class="concern" @click="concern()" v-show="isConcern">加关注</span>
                            <span class="concern_already" v-show="!isConcern" @click="cancelConcern()">已关注</span>
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
                                    <li v-for="(value,domain,domainIndex) in authorInfo.Author_Domain" :key="domainIndex">{{domain}}</li>
                                </ul>
                            </div>
                            <div id="layer">
                                <ul>
                                    <li></li>
                                </ul>
                            </div>
                        </section>
                        <section class="other_informations">
                            <div class="level">
                                <span>Level：</span>
                                <span id="author_level"></span>
                            </div>
                            <div class="org">
                                <span>所属机构：</span>
                                <span id="org"></span>
                            </div>
                            <div class="connection">
                                <span>联系方式：</span>
                                <ul></ul>
                            </div>
                            <div class="article_cite">
                                <span>高质量引用/引用：</span>
                                <span id="cited_num"></span>
                            </div>
                            <div class="article">
                                <span>A类文章/文章：</span>
                                <span id="article_num"></span>
                            </div>
                            <div class="webpage">
                                <span>个人主页：</span>
                                <span id="page"></span>
                            </div>
                            <div class="introduction">
                                <span>个人简介：</span>
                                <span id="introduction">XX大学教授，现担任"XX工程实验室"主任...</span>
                                <span id="int_more">[更多]</span>
                                <div id="introduction_more">
                                    <span class="out">
                                        <span class="inner"></span>
                                    </span>
                                    <h2>个人简介</h2>
                                    <span class="intro_more">XX大学教授，现担任“XX国家工程实验室”主任，XX大学XX学院院长，XX协会主任.</span>
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
                        <h2 class="title active">TA的关注</h2>
                        <h2 class="title" style="left: -12px">TA的粉丝</h2>
                    </header>
                    <ul class="concern_list">
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
                    <ul class="fans_list" style="display: none;">
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
                    <div id="my_keywords"></div>
                </section>
                <section class="article_list">
                    <header class="introduction_head">
                        <h2 class="title">文章列表</h2>
                        <ul>
                            <li id="time_ordering" class="active">按时间排列</li>
                            <li id="level_ordering">按档次排列</li>
                        </ul>
                    </header>
                    <div class="articlelists">
                        <ul class="new_list">
                             <li>
                                 <h3><span class="ar_year">2017</span><a href="#">A Novel Pattern Clustering Algorithm Based on Particle Swarm Optimization Joint Adaptive Wavelet Neural Network Model</a></h3>
                                 <p class="ar_author"> <a>Shoubao Su(R5)</a>;<a>Haifeng Guo(R5)</a>;<a>Haimei Tian(R5)</a>;<a>Gang Wu(R5)</a></p>
                                 <p class="ar_jour"><a>MOBILE NETWORKS & APPLICATIONS(C)</a></p>
                                 <p class="ar_domain">领域：<span>Computer Science(all) ;Hardware and Architecture ;Computer Networks and Communications ;Information Systems ;Software ;</span></p>
                                 <p class="ar_level">档次：<span>C</span></p>
                                 <div class="item_info">
                                    <span class="high">2</span>
                                    <span class="cite">6</span>
                                 </div>
                             </li>
                             <li>
                                 <h3><span class="ar_year">2017</span><a href="#">A Novel Pattern Clustering Algorithm Based on Particle Swarm Optimization Joint Adaptive Wavelet Neural Network Model</a></h3>
                                 <p class="ar_author"> <a>Shoubao Su(R5)</a>;<a>Haifeng Guo(R5)</a>;<a>Haimei Tian(R5)</a>;<a>Gang Wu(R5)</a></p>
                                 <p class="ar_jour"><a>MOBILE NETWORKS & APPLICATIONS(C)</a></p>
                                 <p class="ar_domain">领域：<span>Computer Science(all) ;Hardware and Architecture ;Computer Networks and Communications ;Information Systems ;Software ;</span></p>
                                 <p class="ar_level">档次：<span>C</span></p>
                                 <div class="item_info">
                                    <span class="high">2</span>
                                    <span class="cite">6</span>
                                 </div>
                             </li>
                             <li>
                                 <h3><span class="ar_year">2017</span><a href="#">A Novel Pattern Clustering Algorithm Based on Particle Swarm Optimization Joint Adaptive Wavelet Neural Network Model</a></h3>
                                 <p class="ar_author"> <a>Shoubao Su(R5)</a>;<a>Haifeng Guo(R5)</a>;<a>Haimei Tian(R5)</a>;<a>Gang Wu(R5)</a></p>
                                 <p class="ar_jour"><a>MOBILE NETWORKS & APPLICATIONS(C)</a></p>
                                 <p class="ar_domain">领域：<span>Computer Science(all) ;Hardware and Architecture ;Computer Networks and Communications ;Information Systems ;Software ;</span></p>
                                 <p class="ar_level">档次：<span>C</span></p>
                                 <div class="item_info">
                                    <span class="high">2</span>
                                    <span class="cite">6</span>
                                 </div>
                             </li>
                             <li>
                                 <h3><span class="ar_year">2017</span><a href="#">A Novel Pattern Clustering Algorithm Based on Particle Swarm Optimization Joint Adaptive Wavelet Neural Network Model</a></h3>
                                 <p class="ar_author"> <a>Shoubao Su(R5)</a>;<a>Haifeng Guo(R5)</a>;<a>Haimei Tian(R5)</a>;<a>Gang Wu(R5)</a></p>
                                 <p class="ar_jour"><a>MOBILE NETWORKS & APPLICATIONS(C)</a></p>
                                 <p class="ar_domain">领域：<span>Computer Science(all) ;Hardware and Architecture ;Computer Networks and Communications ;Information Systems ;Software ;</span></p>
                                 <p class="ar_level">档次：<span>C</span></p>
                                 <div class="item_info">
                                    <span class="high">2</span>
                                    <span class="cite">6</span>
                                 </div>
                             </li>
                             <li>
                                 <h3><span class="ar_year">2017</span><a href="#">A Novel Pattern Clustering Algorithm Based on Particle Swarm Optimization Joint Adaptive Wavelet Neural Network Model</a></h3>
                                 <p class="ar_author"> <a>Shoubao Su(R5)</a>;<a>Haifeng Guo(R5)</a>;<a>Haimei Tian(R5)</a>;<a>Gang Wu(R5)</a></p>
                                 <p class="ar_jour"><a>MOBILE NETWORKS & APPLICATIONS(C)</a></p>
                                 <p class="ar_domain">领域：<span>Computer Science(all) ;Hardware and Architecture ;Computer Networks and Communications ;Information Systems ;Software ;</span></p>
                                 <p class="ar_level">档次：<span>C</span></p>
                                 <div class="item_info">
                                    <span class="high">2</span>
                                    <span class="cite">6</span>
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
import axios from 'axios'
    export default {
        data(){
            return{
                name:'AuthorHomePage',
                isShowSearchbox:true,
                bg_mask:false,
                isConcern:true,
                authorInfo:'',
            }
        },
        created(){
            this.getAuthorInfo()
        },
        methods:{
            getAuthorInfo(){
                axios({
                    url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/authorHomePage',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.authorInfo = response.data
                        console.log(this.authorInfo)
                    }
                }).catch(error=>{
                    alert(error)
                })
            },
            isMask(data){
                this.bg_mask = data
            },
            concern(){
                this.isConcern = false
            },
            cancelConcern(){
                this.isConcern = true
            }
        },
        components:{Header}

    }
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/authorHomepage.css';
</style>