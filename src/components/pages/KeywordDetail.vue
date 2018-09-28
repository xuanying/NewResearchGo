<template>
    <div>
        <div class="bg_mask" v-show="bg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>

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