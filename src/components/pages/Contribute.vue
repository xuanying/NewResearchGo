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
                <span id="change_word">换一批</span>
            </section>
            <section class="jour_content">
                <div class="jour_part">
                    <div class="part_left">
                        <h1 class="rankA"><a href="">PAMI</a></h1>
                        <p>录用数：高于同档次平均<span>5%</span></p>
                        <p style="display: inline-block;">我的关键词：</p>
                        <div class="keyword_info">
                            <p><span>AA</span>占比<span>5</span>篇，同比增长<span>1</span>篇</p>
                            <p><span>BB</span>占比<span>1</span>篇，同比增长<span>2</span>篇</p>
                        </div>
                        <p style="display: inline-block;">我的好友：</p>
                        <div class="friend_info">
                            <p><span>Ming</span>占比<span>5</span>篇，同比增长<span>1</span>篇</p>
                        <p><span>Liu</span>占比<span>1</span>篇，同比增长<span>2</span>篇</p>
                        </div>
                    </div>
                    <div class="my_keywords"></div>
                </div>
                <div class="jour_part">
                    <div class="part_left">
                        <h1 class="rankA"><a href="">PAMI</a></h1>
                        <p>录用数：高于同档次平均<span>5%</span></p>
                        <p style="display: inline-block;">我的关键词：</p>
                        <div class="keyword_info">
                            <p><span>AA</span>占比<span>5</span>篇，同比增长<span>1</span>篇</p>
                            <p><span>BB</span>占比<span>1</span>篇，同比增长<span>2</span>篇</p>
                        </div>
                        <p style="display: inline-block;">我的好友：</p>
                        <div class="friend_info">
                            <p><span>Ming</span>占比<span>5</span>篇，同比增长<span>1</span>篇</p>
                        <p><span>Liu</span>占比<span>1</span>篇，同比增长<span>2</span>篇</p>
                        </div>
                    </div>
                    <div class="my_keywords"></div>
                </div>
            </section>
        </div>
            <div class="clear"></div>
    </div>
    </div>
</template>

<script>
import Header from '../common/Header'
    export default {
        name:'Contribute',
        data(){
            return{
                isShowSearchbox:true,

            }
        },
    components:{
        Header
    },
    methods:{
         isMask(data){
          this.bg_mask = data
        }
    }
}
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/contribute.css';
</style>