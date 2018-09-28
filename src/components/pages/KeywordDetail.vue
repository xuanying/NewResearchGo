<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
<div class="main">
        <div class="main_content">
            <div class="keyword_messages">
                <button class="collection" type="button" name="CollectionFalse">收藏</button>
                <h1></h1>
                <section class="basic_informations">
                    <section class="zhu_chart">
                        <h2>热度柱状图</h2>
                        <div id="container"></div>
                    </section>
                    <section class="fields">
                        <h2>领域</h2>
                        <div class="detail_message">
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </section>
                    <section class="masters">
                        <h2>作者列表</h2>
                        <div class="detail_message">
                            <ul></ul>
                        </div>
                    </section>
                </section>
                <section class="article_list">
                    <header class="introduction_head">
                        <h2 class="title">文章列表</h2>
                        <ul>
                            <li id="time_ordering" class="active">按时间排列</li>
                            <li id="level_ordering">按档次排列</li>
                        </ul>
                    </header>
                    <div class="wait_data" style="text-align: center;display: inline-block;float: right;font-size: 0.8em">正在加载……</div>
                    <div class="articlelists">
                        <ul class="new_list">
                            <!-- <li>
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
                             </li> -->
                        </ul>
                    </div>
                    <div class="moreinformation" id="pagerArea" style="-moz-user-select:none;"></div>
                    <div class="wait_data" style="text-align: center;margin-top: 10px">正在加载……</div>
                </section>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Header from '../common/Header'
    export default {
        name:'KeywordDetail',
        data(){
            return{
                isShowSearchbox:true,
                bg_mask:false
            }
        },
        components:{Header},
        methods:{
            isMask(data){
                this.bg_mask = data
            }
        }

    }
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/keywordDetail.css';
</style>