<template>
    <div class="app">
        <div style="top: 10px;left: 20px;font-size: 20px;font-weight: 800;color: black;position: absolute">API-接口开放平台</div>
        <div class="a"/>
        <div class="yuan1"></div>
        <div class="yuan2"></div>
        <div class="left"/>
        <div class="right"/>
        <a-card class="login-box" bordered="true">
            <div>
                <span class="login-title" >API-接口开放平台</span><br>
            </div>
            <div class="login">
                <a-input class="login-input" size="large" prefix-icon="el-icon-user"  v-model="UserLoginRequest.userAccount" placeholder="请输入账号">
                    <a-icon slot="prefix" type="user" />
                </a-input>
                <a-input-password class="login-input" size="large" prefix-icon="el-icon-lock" v-model="UserLoginRequest.userPassword" placeholder="请输入密码" show-password>
                    <a-icon slot="prefix" type="lock" />
                </a-input-password><br>
                <a-button type="primary" style="height: 40px;width: 300px; margin-top: 20px" @click="userLogin">登录</a-button>
            </div>
        </a-card>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "login",
        data(){
            return{
                auto:false,
                UserLoginRequest:{
                    userAccount:'',
                    userPassword:''
                }
            }
        },
        mounted() {
            document.addEventListener('keydown', this.handleKeyPress);
        },
        beforeDestroy() {
            // 在组件销毁前，移除键盘事件监听
            document.removeEventListener('keydown', this.handleKeyPress);
        },
        methods:{
            userLogin(){
                if(this.UserLoginRequest.userAccount.length==0){
                    this.$message.error("请输入账号")
                    return;
                }
                if(this.UserLoginRequest.userPassword.length==0){
                    this.$message.error("请输入密码")
                    return;
                }
                axios.post("/api/user/admin/login",this.UserLoginRequest).then((res)=>{
                    if(res.data.code === 0){
                        let token=res.data.data.token;
                        window.sessionStorage.setItem("token",token)
                        this.$router.push("/")
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            },
            handleKeyPress(event) {
                // 监听键盘事件，按下 "Enter" 键时触发登录按钮的点击事件
                if (event.key === 'Enter') {
                    this.userLogin();
                }
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    /*.app{*/
    /*    position: relative;*/
    /*    width: 100%;*/
    /*    height: 900px;*/
    /*    border: 1px solid #666666;*/
    /*    !*background: linear-gradient(45deg, white, white,#F2F6FC,#ADD8E6,#E6E6FA,white,white);*!*/
    /*    !*position: fixed;*!*/
    /*    !*top: 0; !* 设置容器元素距离页面顶部的位置 *!*!*/
    /*    !*left: 0; !* 设置容器元素距离页面左侧的位置 *!*!*/
    /*    !*width: 100%; !* 设置容器元素的宽度为100%，也可以根据需要自定义 *!*!*/
    /*    !*height: 100%; !* 设置容器元素的高度为100%，也可以根据需要自定义 *!*!*/
    /*}*/
    .a{
        position: absolute;
        top: 0;
        left: 0;
        width: 350px;
        height: 350px;
        background-image: url("../../../assets/blue-login-left-top.cadbe81d.png");
        background-size: 100% 100%;
    }
    .yuan1{
        position: absolute;
        width: 80px;
        height: 80px;
        top: 100px;
        left: 80px;
        background-image: url("../../../assets/yuan2.cae757d1.png");
        background-size: 100% 100%;
    }
    .left{
        position: absolute;
        display: inline-block;
        height: 80%;
        width: 40%;
        background-image: url("../../../assets/bg1.png");
        top: 140px;
        left: 180px;
        background-size: 100% 100%;
    }
    .right{
        display: inline-block;
        position: absolute;
        width: 40%;
        height: 100%;
        right: 0;
        top: 0;
        background-image: url("../../../assets/bg.png");
        background-size: 100% 100%;
    }
    html,
    body,
    .app{
        height: 100%;
    }
    .login-box{
        position: absolute;
        top: 300px;
        right: 380px;
        width: 450px;
        height: 350px;
        text-align: center;
        border: 1px solid #eeeeee;
        background-color: white;
        border-radius: 15px;
        opacity: 1;
    }
    .login-title{
        font-weight: 800;
        font-size: 30px;
    }
    .login-input{
        width: 300px;
        font-size: 15px;
        margin-top: 20px;
    }
    a{
        font-size: 12px;
        color: blue;
    }
</style>