<template>
  <div id="app">
      <wordcloud class="wordcloud"
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      :rotate="rotate"
      :spiral="spiral"
      :fontScale="fontScale"
      :fontSize="fontSize"
      :margin="margin"
      :wordPadding="wordPadding"
      :showTooltip="true"
      :wordClick="wordClickHandler">
      </wordcloud>
      <!-- :color="myColors" -->
  </div>
</template>

<script>
import wordcloud from '../common/WordCloud'

export default {
  name: 'app',
  components: {
    wordcloud
  },
  methods: {
    wordClickHandler(name, value, vm) {
      // console.log('wordClickHandler', name, value, vm);
      alert('wordClickHandler' + name + value + 'vm:'+ vm)
    }
  },
  data() {
    return {
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
      rotate:{from: -5, to: 10, numOfOrientation: 6 },
      spiral:'rectangular',
      fontScale:'log',
      fontSize:[8,50],
      wordPadding:10,
      margin:{top: -5, right: -5, bottom: -5, left: -5 },
      defaultWords: [{
          "name": "Computer vision",
          "value": 26
        },
        {
          "name": "machine learning",
          "value": 19
        },
        {
          "name": "classification",
          "value": 18
        },
        {
          "name": "face detection",
          "value": 16
        },
        {
          "name": "object detection",
          "value": 15
        },
        {
          "name": "clound computing",
          "value": 9
        },
        {
          "name": "big data",
          "value": 9
        },
        {
          "name": "information system",
          "value": 9
        },
        {
          "name": "spring clound",
          "value": 6
        },
        {
          "name":"spring boot",
          "value":10
        },
        {
          "name":"java thread",
          "value":8
        },
        {
          name:'balabalabalabala',
          value:13
        }
      ]
    }
  }
}
</script>

<style scoped>
.wordcloud{
  width: 450px;
  height: 450px;
  border: 1px solid red;
}
div.tooltip{
  width: 200px;
  height: 100px;
}
</style>
