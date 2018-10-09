<template>
  <div>
    <div id="app">
      <a class="btn" @click="toggleShow">设置头像</a>
      <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail"
        v-model="show" :width="300" :height="300" url="/upload" :params="params" :headers="headers" img-format="png"></my-upload>
      <img :src="imgDataUrl">
    </div>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload'
  export default {
    name: 'Test',
    data() {
      return {
        show: true,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '' // the datebase64 url of created image
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }
    },
    components: {
      'my-upload': myUpload
    }
  }

</script>

<style scoped>

</style>
