<template>
  <div class="pageination_align">
    <div class="pageination" v-if="pageinationTotal">
      <div @click="pageUp(0)" class="pagination_page" :class="startDisabled?'disabled':''">首页</div>
      <div @click="pageUp(1)" class="pagination_page" :class="startDisabled?'disabled':''">上一页</div>
      <div class="pagination_page" :class="item==pageinationCurrentPage?'pagination_page_active':''"
           v-for="(item,itemIndex) in pageinationLength" @click="jump(item)" :key="itemIndex">
        {{item}}
      </div>
      <div @click="pageDown(1)" class="pagination_page" :class="endDisabled?'disabled':''">下一页</div>
      <div @click="pageDown(0)" class="pagination_page pagination_page_right" :class="endDisabled?'disabled':''">尾页
      </div>
      <div class=" jumpdiv">
          <input class=" jumpInput" type="text" v-model="jumpPages">
          <span class=" jumpButton" @click="pageDown(3)">跳转</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pageination',
    props: ['total', 'size', 'page', 'changge', 'isUrl'],
    data(){
      return {
        pageinationTotal: this.total,//总条目数
        pageinationSize: this.size ? this.size : 10,//每页显示条目个数
        pageinationLength: [],
        pageinationCurrentPage: this.page ? this.page : 1,//当前页数默认1
        pageinationPage: 0,//可分页数
        startDisabled: true,//是否可以点击首页上一页
        endDisabled: true,//是否可以点击尾页下一页
        pageChangge: this.changge,//修改方法
        pageIsUrl: this.isUrl ? true : false,//是否开启修改url
        jumpPages:1,
      }
    },
    methods: {
      jump(item){
        this.pageinationCurrentPage = item;
        this.pagers();
        this.pageChangge(this.pageinationCurrentPage);
      },//跳转页码
      pagers(){
        //可分页数
        this.pageinationPage = Math.ceil(this.pageinationTotal / this.pageinationSize);

        //url修改
        if (this.pageIsUrl) {
          this.$router.replace({
            path: this.$route.path,
            query: {
              page: this.pageinationCurrentPage,
            }
          });
        }
        //是否可以点击上一页首页
        this.startDisabled = this.pageinationCurrentPage != 1 ? false : true;
        //是否可以点击下一页尾页
        this.endDisabled = this.pageinationCurrentPage != this.pageinationPage ? false : true;
        if(this.pageinationPage==0) this.endDisabled=true;

        //重置
        this.pageinationLength = [];
        //开始页码1
        let start = this.pageinationCurrentPage - 4 > 1 ? this.pageinationCurrentPage - 4 : 1;
        //当前页码减去开始页码得到差
        let interval = this.pageinationCurrentPage - start;
        //最多9个页码，总页码减去interval 得到end要显示的数量+
        let end = (9 - interval) < this.pageinationPage ? (9 - interval) : this.pageinationPage;
        //最末页码减开始页码小于8
        if ((end - start) != 8) {
          //最末页码加上与不足9页的数量，数量不得大于总页数
          end = end + (8 - (end - start)) < this.pageinationPage ? end + (8 - (end - start)) : this.pageinationPage;
          //最末页码加上但是还不够9页，进行开始页码追加，开始页码不得小于1
          if ((end - start) != 8) {
            start = (end - 8) > 1 ? (end - 8) : 1;
          }
        }
        for (let i = start; i <= end; i++) {
          this.pageinationLength.push(i);
        }
      },//计算分页显示的数字
      pageUp(state){
        if (this.startDisabled)return;
        if (this.pageinationCurrentPage - 1 != 0 && state == 1) {
          this.jump(this.pageinationCurrentPage - 1);
        } else {
          this.jump(1);
        }

      },//上一页跟首页 state=1是上一页 state=0是首页
      pageDown(state){
        if (this.endDisabled)return;
        if (this.pageinationCurrentPage + 1 != this.pageinationPage && state == 1) {
          this.jump(this.pageinationCurrentPage + 1);
        } else if(state == 0){
          this.jump(this.pageinationPage);
        }else{
            this.jump(this.jumpPages);
        }

      },// state=1是下一页 state=0是尾页
      pageCurrentChange(){
        this.pageChangge(this.pageinationCurrentPage);
        this.pagers();
      }
    },
    created(){
      this.pageCurrentChange();
    },
    watch: {
      total: function (val, oldVal) {
        this.pageinationTotal = val;
        this.pagers();
      },
      page:function (val, oldVal) {
        this.pageinationCurrentPage = val;
        this.pagers();
      }
    }
  }
</script>

<style scoped>
  .pageination_align{
    text-align: center
  }
  .pageination {
    color: #48576a;
    font-size: 16px;
    display: inline-block;
    user-select: none;
  }

  .pagination_page {
    padding: 0 4px;
    border: 1px solid #d1dbe5;
    border-right: 0;
    background: #fff;
    font-size: 16px;
    min-width: 38px;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    float: left;
  }

  .pagination_page_right {
    border-right: 1px solid #d1dbe5;
  }

  .pagination_page:hover {
    color: #20a0ff;
  }

  .disabled {
    color: #e4e4e4 !important;
    background-color: #fff;
    cursor: not-allowed;
  }

  .pagination_page_active {
    border-color: #20a0ff;
    background-color: #20a0ff;
    color: #fff !important;;
    cursor: default;
  }
  .jumpInput{
      width: 20px;
      height: 38px;
      border-style:none;
      /* border-bottom: 1px solid #d1dbe5; */
  }
  .jumpdiv{
      float: left;
      width: 90px;
      height: 38px;
      font-size: 16px;
      margin-left: 100px;
      border: 1px solid #d1dbe5;
  }
  .jumpButton{
      border-style:none;
      height: 38px;
      font-size: 16px;
      border-left: 1px solid #d1dbe5;
      /* border-bottom: 1px solid #d1dbe5; */
  }
  .jumpButton:hover{
      color: #20a0ff;
  }
</style>
