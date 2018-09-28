<template>
    <div>
        <div>
           <Chart :id="id" :option="option"></Chart>
        </div>
    </div>
</template>

<script>
import Chart from '../common/Chart'
    export default {
        name:'Test',
        data () {
    return {
      hotTag: [{"id":"05023f8da31c4b4187cc6899e2a3aec2","name":"镇远县"},{"id":"0ef028e5278f4f5ca31f99f1bd22b1cc","name":"剑河县"},{"id":"1a32ef04d3c548eaa6777abb46da32f2","name":"台江县"},{"id":"2c26488325bd493687d16315fe0e5fdd","name":"岑巩县"},{"id":"3a786111828a4b9f89ae9da25753eedd","name":"黎平"},{"id":"4ed593eed91b4244969995237f5c96c5","name":"丹寨县"},{"id":"615d2c178f1a47cb8d473823e74f5386","name":"凯里市"},{"id":"76f652df03db43349272a9aff492b065","name":"榕江县"},{"id":"8ff29d0d35e548feb945063b34ed9c9b","name":"黄平县"},{"id":"a8ac2170008746fdadc05ea461bc5e37","name":"雷山县"}]
      ,
      tagConfig:{'hover':true,'radius':60},
      id:'test',
      option:{}
    }
  },
  methods: {
    clickTagItem (tag) {
      // TODO
    },
    drawChart() {
        let yearObj = '{"2012": [5, 3],"2013": [3, 1],"2014": [7, 5],"2015": [10, 8],"2016": [2, 0]}'
        if (yearObj != '{}') {
          let year_list = [],num_list =[] ,high_list = []
          for(let key in yearObj){
            year_list.push(key)
            num_list.push(yearObj[key][0])
            high_list.push(yearObj[key][1])
          }
          this.option = {
            credits:{
               enabled: false
            },
            chart: {
              type: 'column',
              width: 650,
              height: 450,
              marginTop: 50
            },
            title: {
              text: ''
            },
            xAxis: {
              title: {
                align: 'high',
                text: '年份'
              },
              categories: year_list
            },
            yAxis: [{
              min: 0,
              title: {
                rotation: '',
                align: 'high',
                text: '文章数'
              }
            }],
            legend: {
              shadow: false
            },
            tooltip: {
              shared: true
            },
            plotOptions: {
              column: {
                grouping: false,
                shadow: false,
                borderWidth: 0,
                // events: {
                //   click: function (e) {
                //     choose_list = this.paperInfo.Paper_Cited;
                //     obj_ref.style.backgroundColor = "#ececec";
                //     obj_cite.style.backgroundColor = "grey";
                //     var year_choose = e.point.category;
                //     var count_choose = e.point.y;
                //     articles.empty();
                //     $.each(choose_list, function (e, value) {
                //       // choose_paper(value, year_choose, count_choose);
                //       //是否A类
                //       var isa = false;
                //       if (value.Paper_Level == 'A') {
                //         isa = true;
                //       }
                //       //用户选中类型，0为全部，1为A类
                //       var type_choose = 0;
                //       if (count_choose == article_messages.Cited_Yearly[year_choose][1]) {
                //         type_choose = 1;
                //       }
                //       if (type_choose == 1) {
                //         if (value.Paper_Year == year_choose && isa == true) {
                //           create_articleLi(value);
                //           articles.append(article_li);
                //         }
                //       } else {
                //         if (value.Paper_Year == year_choose) {
                //           create_articleLi(value);
                //           articles.append(article_li);
                //         }
                //       }
                //     });
                //     pager(choose_list.length);
                //   }
                // }
              }
            },
            series: [{
              name: '文章',
              color: 'rgba(165,170,217,1)',
              data: num_list,
              pointPadding: 0.3,
              pointPlacement: 0
            }, {
              name: 'A类',
              color: 'rgba(126,86,134,.9)',
              data: high_list,
              pointPadding: 0.3,
              pointPlacement: 0
            }]
          }
        }
      }
  },
  components:{Chart}
    }
</script>

<style scoped>

</style>