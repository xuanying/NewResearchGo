<template>
  <div>
    <div class="bg_mask" v-show="bg_mask"></div>
    <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
    <div class="main">
      <div class="main_content">
        <div class="edit_messages">
          <h1>个人设置</h1>
          <form id="update_form" method="post" action="/personal_settings/" enctype="multipart/form-data">
            <div class="text_messages">
              <div class="item">
                <label>昵称：</label>
                <input id="call_name" name="call_name" type="text" required>
              </div>
              <div class="item">
                <label>中文名：</label>
                <input id="chinese_name" name="chinese_name" type="text">
              </div>
              <div class="item">
                <label>英文名：</label>
                <input id="english_name" name="full_name" type="text" required>
              </div>
              <!--<div class="item" id="abbr">-->
              <!--<label>英文缩写：</label>-->
              <!--<input type="button" id="add_abbr" class="add_message" value="+">-->
              <!--<input type="button" class="sub_message" value="-" disabled>-->
              <!--<input class="short abbr" name="abbr_name" type="text">-->
              <!--</div>-->
              <div class="item">
                <label>个人简介：</label>
                <textarea id="introduce" name="profile" type="text"></textarea>
              </div>
              <div class="item" id="field">
                <label>领域：</label>
                <p class="itemp">
                  <input class="short field" name="domain" type="text" required readonly v-for="(field,fieldIndex) in arrField"
                    :key="fieldIndex">
                  <input type="button" id="add_field" class="add_message" value="+">
                  <input type="button" class="sub_message" value="-">
                </p>


              </div>
              <!--<div class="item">-->
              <!--<label>关键词：</label>-->
              <!--<input class="short keyword" name="keyword" type="text" required>-->
              <!--</div>-->
              <!--<div class="item">-->
              <!--<label></label>-->
              <!--<input class="short keyword" name="keyword" type="text" required>-->
              <!--</div>-->
              <div class="item" id="keyword">
                <label>关键词：</label>
                <p class="itemp">
                  <input class="short keyword" name="keyword" type="text" required>
                  <input type="button" id="add_keyword" class="add_message" value="+">
                  <input type="button" class="sub_message" value="-" disabled>
                </p>
              </div>
              <div class="item" id="email">
                <label>邮箱：</label>
                <p class="itemp">
                  <input class="short email" name="email" type="email">
                  <input type="button" id="add_email" class="add_message" value="+">
                  <input type="button" class="sub_message" value="-" disabled>
                </p>
              </div>
              <div class="item">
                <label>QQ：</label>
                <input id="QQ" name="social" type="text">
              </div>
              <div class="item">
                <label>微信：</label>
                <input id="wechat" name="social" type="text">
              </div>
              <div class="item">
                <label>电话：</label>
                <input id="phone" name="social" type="text">
              </div>
              <div class="item">
                <label>facebook：</label>
                <input id="facebook" name="social" type="text">
              </div>
              <div class="item">
                <label>twitter：</label>
                <input id="twitter" name="social" type="text">
              </div>
              <div class="item">
                <label>ins：</label>
                <input id="ins" name="social" type="text">
              </div>
            </div>
            <div class="portrait">
              <img :src="imgDataUrl" style="overflow: hidden">
              <input type="button" value="修改头像" @click="changePortrait()" style="cursor: pointer;">
              <my-upload field="img" 
              @src-file-set="srcFileSet"
              @crop-success="cropSuccess" 
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail" 
              v-model="show" :width="300" :height="300" 
              url="/upload" :params="params"
              :headers="headers" img-format="png"></my-upload>
            </div>
            <div class="field_choose_box">
              <header class="field_choose_box_head">
                <ul class="field_choose_box_tabs">
                  <!--tabs-->
                </ul>
              </header>
              <div class="choose_content">
                <ul>
                  <!--领域列表-->
                </ul>
              </div>
              <footer class="field_choose_box_footer">
                <button type="button">返回</button>
              </footer>
            </div>

            <div class="clear"></div>
            <input id="save" type="submit" value="保存">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/Header'
  import myUpload from 'vue-image-crop-upload'
  export default {
    name: 'PersonalDateEdit',
    data() {
      return {
        isShowSearchbox: true,
        bg_mask: false,
        arrField: [1],
        show: false,
        imgDataUrl:'',
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
      }
    },
    methods: {
      isMask(data) {
        this.bg_mask = data
      },
      changePortrait() {
        this.show = !this.show
      },
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
        console.log('名字:' + field)
      },
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------');
        console.log('jsonData' + jsonData);
        console.log('field: ' + field);
      },
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
      srcFileSet(fileName, fileType, fileSize){
          console.log('filename' + fileName)
          console.log('fileType' + fileType)
          console.log('fileSize' + fileSize)
      }
    },
    components: {
      Header,
      'my-upload': myUpload
    }
  }

</script>

<style scoped>
  @import '../../assets/css/base.css';
  @import '../../assets/css/personalDateEdit.css';

</style>
