// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueHighcharts from 'highcharts' 
import echarts from 'echarts'
// import tagCloud from 'v-tag-cloud'
// import VueClickoutside from 'vue-clickoutside'

require('echarts-wordcloud')

Vue.use(VueHighcharts)
// .use(VueClickoutside)
Vue.prototype.$echarts = echarts
// Vue.directive('v-clickoutside', VueClickoutside)
// .use(tagCloud)
// Vue.component('paginate', Paginate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
