<template>
    <div>
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
                    <input name="call_name" id="call_name_full" type="text" required>
                </p>
                <br />
                <span class="necessary">英文名：</span>
                <p class="input_p">
                    <input name="full_name" id="e_name_full" type="text" required>
                </p>
                <br />
                <span class="necessary">研究领域：</span>
                <div class="input_div">
                    <p class="input_p" id="field">
                        <input name="domain" type="text" class="field" multiple="multiple" readonly required>
                        <input type="button" class="add_message" id="add_field" value="+" style="width: 25px;">
                    </p>
                </div>
                <br />
                <span class="necessary">关键词：</span>
                <div class="input_div">
                    <p class="input_p" id="keyword">
                        <input name='keyword' class="keyword" multiple="multiple" type="text" required>
                        <input type="button" class="add_message" id="add_keyword" value="+" style="width: 25px;">
                    </p>
                </div>
                <p>
                    <input type="button" id="submit_btn" class="next" value="完成" style="height: 30px;">
                </p>
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
            </form>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name:'FirstSignin',
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style scoped>
@import '../../assets/css/first_sign.css';
</style>