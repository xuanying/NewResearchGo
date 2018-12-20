<template>
    <div class="firstSigninBody">
        <header class="first_head">
        <div class="head_content">
            <h1>完善个人信息</h1>
            <h2>简单介绍自己，会为你挑选你可能感兴趣的文章</h2>
        </div>
    </header> 
    <div class="messages">
        <div class="messages_content">
            <form class="messages_form" method="post">
                <p class="hint">带 *的为必填项</p>
                <span class="necessary">昵称：</span>
                <p class="input_p">
                    <input name="call_name" id="call_name_full" type="text" required v-model="username">
                </p>
                <br />
                <span class="necessary">英文名：</span>
                <p class="input_p">
                    <input name="full_name" id="e_name_full" type="text" required v-model="enname">
                </p>
                <br />
                <span class="necessary">研究领域：</span>
                <div class="input_div">
                    <p class="input_p" id="field" v-for="(field,fieldIndex) in fieldArr" :key="fieldIndex">
                        <input name="domain" type="text" class="field" multiple="multiple" v-model="fieldList[fieldIndex]" required readonly  @focus="showAllField()">
                    </p>
                        <input type="button" class="add_message" id="add_field" value="+" style="width: 25px;" @click="addField()">
                        <input type="button" class="add_message" id="add_field" value="-" style="width: 25px;" @click="subField()">
                </div>
                <br />
                <span class="necessary">关键词：</span>
                <div class="input_div">
                    <p class="input_p" id="keyword" v-for="(keyword,keywordIndex) in keywordArr" :key="keywordIndex">
                        <input name='keyword' class="keyword" multiple="multiple" type="text" required v-model="keywordList[keywordIndex]">
                    </p>
                        <input type="button" class="add_message" id="add_keyword" value="+" style="width: 25px;" @click="addKeyword()">
                        <input type="button" class="add_message" id="add_keyword" value="-" style="width: 25px;" @click="subKeyword()">
                </div>
                <p>
                    <input type="button" id="submit_btn" class="next" value="完成" style="height: 30px;" @click="submit()">
                </p>
                <div class="field_choose_box" v-show="isFieldWinShow">
                    <header class="field_choose_box_head">
                        <ul class="field_choose_box_tabs">
                            <li v-for="(firstLetter,firstLetterIndex) in firstLetterList" :key="firstLetterIndex" 
                            @click="firstLetterChooseField(firstLetter,firstLetterIndex)" :class="{'active':firstLetterIndex == selectIndex}">{{firstLetter}}</li>
                        </ul>
                    </header>
                    <div class="choose_content">
                        <ul>
                            <li v-for="(field,fieldIndex) in showFieldByFirstLetter" :key="fieldIndex" @click="chooseField(field)">{{fieldIndex +1 + '.' + field}}</li>
                        </ul>
                    </div>
                    <footer class="field_choose_box_footer">
                        <button type="button" @click="hideAllField()">返回</button>
                    </footer>
                </div>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import {
    setCookie,
    getCookie,
    delCookie,
    delAllCookie
  } from '@/tools/cookie.js'
  import baseUrl from '@/serviceAPI.config.js'
    export default {
        name:'FirstSignin',
        data(){
            return{
                isFieldWinShow:false,
                allField:'',
                fieldArr:[1],
                keywordArr:[0],
                fieldList:[],
                keywordList:[],
                firstLetterList:[],
                showFieldByFirstLetter:[],
                selectIndex:0,
                token:'',
                username:'',
                enname:'',
                email:'',

            }
        },
        created(){
            this.getFieldInfo()
            
        },
        methods:{
            getToken(){
                this.token = this.$route.params.token
                this.email = this.$route.params.email
                console.log(this.token + ">>>>>>>>>>>>" + email)
            },
            getFieldInfo(){
                axios({
                    url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/fieldInfo',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.allField = response.data
                        this.showFieldByFirstLetter = response.data['A']
                        this.firstLetterList = this.sortFirstLetter()
                        this.getToken()
                    }
                }).catch(error=>{
                    alert(error)
                })
            },
            addField(){
                this.fieldArr.push(1)
            },
            subField(){
                if(this.fieldArr.length > 1){
                    this.fieldArr.pop()
                }
            },
            addKeyword(){
                this.keywordArr.push(0)
            },
            subKeyword(){
                if(this.keywordArr.length > 1){
                    this.keywordArr.pop()
                }
            },
            showAllField(){
                this.isFieldWinShow = true
            },
            hideAllField(){
                this.isFieldWinShow = false
            },
            sortFirstLetter(){
                let arr = []
                for(let key in this.allField){
                    arr.push(key)
                }
                arr = arr.sort()
                return arr
            },
            firstLetterChooseField(firstLetter,firstLetterIndex){
                this.showFieldByFirstLetter = this.allField[firstLetter]
                this.selectIndex = firstLetterIndex
            },
            chooseField(field){
                this.fieldList.push(field)
                this.isFieldWinShow = false
            },
            submit(){
                console.log(this.fieldList.toString() + "fieldList")
                axios({
                    url:baseUrl + '/api/fillDetailInfo',
                    method:'post',
                    data:{
                        username:this.username,
                        enname:this.enname,
                        fieldList:this.fieldList,
                        keywordList:this.keywordList,
                        email:this.email
                    },
                    headers:{
                        'Content-type':' application/json',
                        'Authorization':this.token
                    }
                }).then(response=>{
                    if(response.status == 200){

                    }
                }).catch(error=>{
                    alert(error)
                })

                this.$router.push({
                    name:'Main'
                })
            }
        },
    }
</script>

<style scoped>
@import '../../assets/css/first_sign.css';
</style>