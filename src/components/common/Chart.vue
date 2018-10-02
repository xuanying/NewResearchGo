<template>
    <div class="x-bar">
    <div :id="id"
    :option="option"></div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'
    export default {
      data(){
        return{
          optionNow:{}
        }
      },
      name:'Chart',
        props: {
          id: {
            type: String
          },
          option: {
            type: Object
          }
        },
  mounted() {
    HighCharts.chart(this.id,this.option)
  },
  // watch:{
  //   option:{
  //     handler(newvalue,oldvalue){
  //     //  this.$nextTick(()=>{
  //     //     console.log('我是nextTick')
  //     //  })
  //      HighCharts.chart(this.id,this.option)
  //     },
  //     deep:true
  //   }
  // }
}
</script>

<style scoped>

</style>