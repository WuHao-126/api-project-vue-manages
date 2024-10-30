<template>
    <div class="content">
        <div class="search">
            <span>日期：</span>
            <a-range-picker style="width: 250px" v-model="dataRange" @change="dateChange"  :locale="locale">
                <template slot="dateRender" slot-scope="current" :locale="locale">
                    <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                        {{ current.date() }}
                    </div>
                </template>
            </a-range-picker>
            <span class="search-title">权限：</span>
            <a-select style="width: 120px"  v-model="reuqestParam.userRole" placeholder="权限">
                <a-select-option value="superadmin">
                    超级管理员
                </a-select-option>
                <a-select-option value="admin">
                    管理员
                </a-select-option>
                <a-select-option value="user">
                    用户
                </a-select-option>
            </a-select>
            <span class="search-title">状态：</span>
            <a-select style="width: 120px" v-model="reuqestParam.userState" placeholder="状态">
                <a-select-option value="0">
                    正常
                </a-select-option>
                <a-select-option value="1">
                    封号
                </a-select-option>
                <a-select-option value="2">
                    注销
                </a-select-option>
            </a-select>
            <span class="search-title">关键字：</span>
            <a-input v-model="reuqestParam.keywords" style="width: 200px" placeholder="请输入关键字" />
            <a-button @click="clear" style="margin-left: 10px;" type="primary">
                清空
            </a-button>
            <a-button @click="getUserInfoList" style="margin-left: 20px" type="primary">
                搜索
            </a-button>
            <a-button @click="showModal" style="margin-left: 10px" type="primary">
                新增
            </a-button>
        </div>
        <a-table :columns="columns" :data-source="userList" :loading="loading" size="middle" rowKey="id">
            <template slot="action" slot-scope="text, record">
                <a href="javascript:void(0)" style="margin-left: 10px" @click="editRecord(record)" type="primary">修改</a>
                <a href="javascript:void(0)" v-if="record.state===1 || record.state === 2" style="margin-left: 10px" @click="updateUserState(record.id,0)" type="primary">恢复</a>
                <a href="javascript:void(0)" v-if="record.state ===0 && record.state !== 2"  style="margin-left: 10px" @click="updateUserState(record.id,1)" type="primary">封号</a>
                <a href="javascript:void(0)" v-if="record.state ===0 && record.state !== 1" style="margin-left: 10px" @click="updateUserState(record.id,2)" type="primary">注销</a>
            </template>
        </a-table>
        <div>
            <a-modal v-model="addVisible" title="用户添加" :footer="null">
                <div>
                    <add-user @addVisible="offModal(val)"></add-user>
                </div>
            </a-modal>
            <a-modal
                    title="修改用户信息"
                    :visible="updateVisible"
                    @ok="updateUserInfo()"
                    @cancel="handleCancel"
                    okText="保存"
                    cancelText="取消"
            >
                <span class="title">昵称：</span>
                <a-input class="input" v-model="selectUserUpdate.userName" placeholder="请输入昵称" /><br><br>
                <span class="title">账号：</span>
                <a-input class="input" v-model="selectUserUpdate.userAccount" placeholder="请输入账号" /><br><br>
                <span class="title">密码：</span>
                <a-input-password class="input" v-model="selectUserUpdate.userPassword" placeholder="请输入密码" /><br><br>
                <span class="title">邮箱：</span>
                <a-input class="input" v-model="selectUserUpdate.email" placeholder="请输入密码" /><br><br>
                <span class="title">权限：</span>
                <a-select default-value="lucy" style="width: 120px" v-model="selectUserUpdate.userRole">
                    <a-select-option value="user">
                        user
                    </a-select-option>
                    <a-select-option value="admin">
                        admin
                    </a-select-option>
                    <a-select-option value="superadmin" disabled>
                        superadmin
                    </a-select-option>
                </a-select>
            </a-modal>
        </div>
    </div>
</template>
<script>
    const columns = [
        {
            title: '昵称',
            dataIndex: 'userName',
            key: 'userName',
            width: 160,
            align:"center"
        },
        {
            title: '账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
            width: 110,
            align:"center",
            customRender:function (text){
                if (text === null) {
                    return "----------";
                }else{
                    return text
                }
            }
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 240,
            align:"center",
            customRender:function (text){
                if (text === null) {
                    return "----------";
                }else{
                    return text
                }
            }
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            width: 110,
            align:"center",
            customRender:function (text){
                if (text === null) {
                    return "----------";
                }else{
                    return text
                }
            }
        },
        {
            title: '权限',
            dataIndex: 'userRole',
            key: 'userRole',
            align:"center",
            customRender:function (text){
                if (text == 'superadmin') {
                    return "超级管理员";
                } else if(text == 'admin'){
                    return "管理员";
                }else{
                    return "普通用户"
                }
            }
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align:"center"
        },
        {
            title: '最近修改时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            align:"center"
        },
        {
            title: '是否有key',
            dataIndex: 'isExistKey',
            key: 'isExistKey',
            align:"center",
            width: 100,
            customRender:function (text){
                if (text){
                    return "是";
                }else{
                    return "否"
                }
            }
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            // key: 'state',
            align:"center",
            customRender:function (text){
                if (text == 0) {
                    return "正常";
                } else if (text == 1){
                    return "封号";
                }else{
                    return "注销"
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align:"center"
        },
    ];
    import addUser from './components/add-user'
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import {
        getUserInfoList,
        addUserInfo,
        updateUserInfo,
        updateUserState
    } from "./api"
    export default {
        components:{
          addUser,
        },
        data() {
            return {
                locale,
                bbb:'zhCN',
                dataRange:'',
                columns,
                userList:[],
                reuqestParam:{
                    userRole:'user',
                    userState:'0',
                    beginDate:'',
                    endDate:'',
                    keywords:''
                },
                addUserRequestParam:{
                    userName:'',
                    userAccount:'',
                    userPassword:'',
                    checkPassword:'',
                    email:'',
                    phone:'',
                    userAvatar: '',
                    userRole:'',
                },
                loading: true,
                addVisible: false,
                updateVisible:false,
                selectUserUpdate:''
            };
        },
        mounted() {
            this.getUserInfoList();
        },
        methods:{
            async getUserInfoList(){
              this.loading=true
              let param={
                  ...this.reuqestParam
              }
              let res=await getUserInfoList(param)
                if(res.data.code === 0){
                    const { records,total}=res.data.data
                    this.userList=records
                    this.loading=false
                }
            },
            async addUserInfo(){
              let param={
                  ...this.addUserInfo()
              }
              let res= await addUserInfo(param)
              if(res.data.code === 0){
                  this.addVisible = false;
                  this.loading = false;
              }
            },
            editRecord(record) {
                // 编辑按钮点击事件，可以在这里执行编辑操作
                this.updateVisible=true
                this.selectUserUpdate=record
                this.selectUserUpdate.userPassword=''
            },
            getCurrentStyle(current, today) {
                const style = {};
                if (current.date() === 1) {
                    style.border = '1px solid #1890ff';
                    style.borderRadius = '50%';
                }
                return style;
            },
            async updateUserState(id,other){
                let param={
                    id:'',
                    other:''
                }
                param.id=id
                param.other=other
                let res = await updateUserState(param)
                if(res.data.code === 0){
                    if(other===0){
                        this.$message.success("恢复用户状态成功")
                    }else if(other===1){
                        this.$message.success("用户封号成功")
                    }else{
                        this.$message.success("用户注销成功")
                    }
                    this.getUserInfoList();
                }else if (res.data.code === 40101){
                    this.$message.error("您没有权限修改此用户")
                }else {
                    this.$message.error("状态修改失败")
                }
            },
            async updateUserInfo(){
               let res=await updateUserInfo(this.selectUserUpdate)
                if(res.data.code===0){
                    this.$message.success("修改成功")
                    this.getUserInfoList();
                    this.updateVisible=false
                }else{
                    this.$message.error(res.data.message)
                }
            },
            dateChange(date, dateString) {
                this.reuqestParam.beginDate=dateString[0]
                this.reuqestParam.endDate=dateString[1]
            },
            clear(){
                this.reuqestParam={}
                this.dataRange=[]
                this.getUserInfoList()
            },
            showModal() {
                this.addVisible = true;
            },
            offModal(val){
                this.addVisible = val;
                this.getUserInfoList()
            },
            handleCancel(e) {
                this.addVisible = false;
                this.updateVisible=false;
            },
        }
    };
</script>
<style scoped>
    .search{
        width: 100%;
        height: 45px;
        padding: 6px;
        background-color: white;
    }
    .search-title{
        margin-left: 20px;
    }
    .title{
        font-size: 14px;
    }
    .input{
        width: 90%;
    }
</style>