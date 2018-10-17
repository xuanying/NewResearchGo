<template>
    <div>
        <div class="bg_mask" v-if="bg_mask"></div>
        <div class="emailbg_mask" v-if="emailbg_mask"></div>
        <Header :showSearchbox="isShowSearchbox" @isMask="isMask"></Header>
         <div class="main">
        <div class="main_content">
            <div class="main_content_left">
                <h2>我的消息</h2>
                <ul>
                    <li id="notice" :class="{'active':noticeActive}">
                        <div @click="showNotice()">
                            <img src="../../assets/images/email_notification.png">
                            <h3>通知</h3>
                            <span class="notice_num" v-show="haveNotice">{{noticeNum}}</span>
                        </div>
                    </li>
                    <li id="letter" :class="{'active':!noticeActive}">
                        <div @click="showPrivateNotice()">
                            <img src="../../assets/images/email_private.png">
                            <h3>私信</h3>
                            <span class="notice_num" v-show="havePrivateEmail">{{privateNotiveNum}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="main_content_right">
                <div class="email_messages">
                    <header>
                        <h4>{{noticeOrPrivate}}</h4>
                        <button type="button" id="c_n_email" v-show="isEmail">发新私信</button>
                    </header>
                    <div class="email_list" v-show="listOrDetail">
                        <div class="no_email" v-show="!isEmailExist">
                            <img src="../../assets/images/no_email.png">
                            <h5>暂时没有邮件</h5>
                        </div>
                        <ul class="emails">
                           <li v-for="(notice,noticeIndex) in emailInfo" :key="noticeIndex" @mouseover="showDeleteBtn(noticeIndex)"
                            @mouseout="hideDeleteBtn(noticeIndex)" @click="showDetail(notice)">
                               <div class="email_abbr">
                                   <img src="../../assets/images/portrait.png">
                                   <div class="email_abbr_text">
                                       <h6>{{notice.Name_Send}}</h6>
                                       <span class="time">{{notice.Time | timeFormatFilter}}</span>
                                       <p>{{notice.Context}}</p>
                                       <span class="delete" v-show="isShowDeleteBtn && pindex == noticeIndex" @click="deleteemails(noticeIndex)">删除</span>
                                   </div>
                               </div>
                           </li>
                        </ul>
                    </div>
                    <div class="email_details" v-show="!listOrDetail">
                        <header>
                            <img src="../../assets/images/portrait.png">
                            <div class="details_title">
                                <h5>{{detailInfo.Name_Send}}</h5>
                                <span class="details_time">{{detailInfo.Time | timeFormatFilter}}</span>
                                <button type="button" id="close_detail" @click="hideDetail()">×</button>
                            </div>
                        </header>
                        <div class="details_main">
                            <p>{{detailInfo.Context}}</p>
                        </div>
                        <div id="private_details" v-show="isEmail">
                        <footer>
                            <button class="re" type="button" @click="replayEmail(detailInfo.Email_send)">回复</button>
                        </footer>
                        <div class="record_list">
                            <ul class="records">
                            <li v-for="(record,recordIndex) in detailInfo.old_messages" :key="recordIndex">
                               <div class="email_abbr">
                                   <div class="email_abbr_text">
                                       <h6>{{record.Name_Send}}</h6>
                                       <span class="time">{{record.Time | timeFormatFilter}}</span>
                                       <p>{{record.Context}}</p>
                                   </div>
                               </div>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div class="new_email" v-show="sendPrivateNotice">
                        <form id="email_create_box" class="email_create_box" method="post" action="/email/">
                            <div class="addressee">
                                <span>收件人</span>
                                <input id="receive_add" name="recipient" type="text" required v-model="emailAddr">
                            </div>
                            <div class="letter_body">
                                <span>正文</span>
                                <textarea name="context" id="context" form="email_create_box"></textarea>
                            </div>
                            <div class="footing">
                                <input type="button" id="send_new" value="发送">
                                <button type="button" @click="cancelReplay()">取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    </div>
</template>

<script>
import Header from '../common/Header';
import axios from 'axios';
    export default {
        name:'Email',
        data(){
            return{
                isShowSearchbox:true,
                bg_mask:false,
                emailbg_mask:false,
                sendPrivateNotice:false,
                isEmailExist:true,
                listOrDetail:true,
                isShowDeleteBtn:false,
                pindex:-1,
                emailInfo:'',
                noticeData:'',
                priveteDate:'',
                noticeOrPrivate:'通知',
                noticeNum:0,
                privateNotiveNum:0,
                haveNotice:false,
                havePrivateEmail:false,
                noticeActive:true,
                detailInfo:'',
                isEmail:false,
                emailAddr:'',
            }
        },
        created(){
            this.getNoticeInfo()
            this.getPrivateNoticeInfo()
        },
        methods:{
            isMask(data){
                this.bg_mask = data
            },
            getNoticeInfo(){
                axios({
                    url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/notice',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.noticeData = response.data
                        this.showNotice()
                        this.noticeNum = this.noticeData.length
                        this.handleNoticeNum(this.noticeNum)
                    }
                }).catch(error=>{
                    alert(error)
                })
            },
            getPrivateNoticeInfo(){
                axios({
                    url:'https://www.easy-mock.com/mock/5b9f5cdbbdb9831993a4272e/privateNotice',
                    method:'get'
                }).then(response=>{
                    if(response.status == 200){
                        this.priveteDate = response.data
                        this.privateNotiveNum = this.priveteDate.length
                        this.handlePrivateNoticeNum(this.emailInfo.length)
                    }
                }).catch(error=>{
                    alert(error)
                })
            },
            showDeleteBtn(noticeIndex){
                this.pindex = noticeIndex
                this.isShowDeleteBtn = true
            },
            hideDeleteBtn(noticeIndex){
                this.pindex = noticeIndex
                this.isShowDeleteBtn = false
            },
            showNotice(){
                this.noticeOrPrivate = '通知'
                this.emailInfo = this.noticeData
                this.handleNoticeNum(this.emailInfo.length)
                this.noticeActive = true
                this.listOrDetail = true
                this.isEmail = false
            },
            showPrivateNotice(){
                this.noticeOrPrivate = '私信'
                this.emailInfo = this.priveteDate
                this.handlePrivateNoticeNum(this.emailInfo.length)
                this.noticeActive = false
                this.listOrDetail = true
                this.isEmail = true
            },
            handleNoticeNum(num){
                if(num < 1){
                    this.haveNotice = false
                }else{
                    this.haveNotice = true
                }
            },
            handlePrivateNoticeNum(num){
                if(num < 1){
                    this.havePrivateEmail = false
                }else{
                    this.havePrivateEmail = true
                }
            },
            showDetail(notice){
                this.listOrDetail = false
                this.detailInfo = notice
                if(this.noticeOrPrivate == '通知'){
                    if(this.noticeNum > 1){
                        this.noticeNum -= 1 
                    }else{
                        this.haveNotice = false
                    }
                }else if(this.noticeOrPrivate == '私信'){
                    if(this.privateNotiveNum > 1){
                        this.privateNotiveNum -= 1
                    }else{
                        this.havePrivateEmail = false
                    }
                }
            },
            hideDetail(){
                this.listOrDetail = true
            },
            replayEmail(emailAddr){
                this.sendPrivateNotice = true
                this.emailbg_mask = true
                this.emailAddr = emailAddr
            },
            cancelReplay(){
                this.sendPrivateNotice = false
                this.emailbg_mask = false
            }

        },
        filters:{
            timeFormatFilter(data){
                let time = new Date(data * 1000)
                return time.toLocaleString()
            }
        },
        components:{Header}
    }
</script>

<style scoped>
@import '../../assets/css/base.css';
@import '../../assets/css/email.css';
</style>