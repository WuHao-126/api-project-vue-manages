<template>
    <div class="content">
        <div class="search">
            <span>日期：</span>
            <a-range-picker style="width: 250px">
                <template slot="dateRender" slot-scope="current">
                    <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                        {{ current.date() }}
                    </div>
                </template>
            </a-range-picker>
            <span class="search-title">类型：</span>
            <a-select default-value="" style="width: 120px" @change="handleChange">
                <a-select-option :value="item.id" v-for="(item,index) in tags" :key="index">
                    {{item.name}}
                </a-select-option>
            </a-select>
            <span class="search-title">状态：</span>
            <a-select default-value="jack" style="width: 120px" @change="handleChange">
                <a-select-option value="jack">
                    上线
                </a-select-option>
                <a-select-option value="lucy">
                    下线
                </a-select-option>
            </a-select>
            <span class="search-title">名称：</span>
            <a-input style="width: 200px" placeholder="请输入接口名称" />
            <span class="search-title">路径：</span>
            <a-input style="width: 200px" placeholder="请输入接口路径" />
            <a-button style="margin-left: 20px" type="primary">
                搜索
            </a-button>
            <a-button style="margin-left: 10px" type="primary">
                清空
            </a-button>
            <a-button style="margin-left: 10px" type="primary">
                新增
            </a-button>
        </div>
        <a-table :columns="columns" :data-source="interfcaeInfo" :loading="loading" size="middle" rowKey="id">
            <template slot="action" slot-scope="text, record">
                <a href="javascript:void(0)" v-if="record.state===0" style="margin-left: 10px" @click="onlineInterfaceInfo(record.id)" type="primary">启用</a>
                <a href="javascript:void(0)" v-if="record.state===1" style="margin-left: 10px" @click="offlineInterfaceInfo(record.id)" type="primary">禁用</a>
<!--                <a href="javascript:void(0)" style="margin-left: 10px" @click="editRecord(record.id)" type="primary">编辑</a>-->
                <a href="javascript:void(0)" style="margin-left: 10px" @click="interfaceDetail(record.id)" type="primary">详细</a>
                <a href="javascript:void(0)" style="margin-left: 10px" @click="deleteInterface(record.id)" type="primary">删除</a>
            </template>
        </a-table>
    </div>
</template>
<script>

    import
    {
        getInterfaceInfoList,
        onlineInterfaceInfo,
        offlineInterfaceInfo,
        getInterfaceTags,
        updateInterfaceInfo,
        deleteInterface
    } from './api'
    export default {
        data() {
            return {
                columns : [
                    {
                        title: '接口名称',
                        dataIndex: 'name',
                        key: 'name',
                        width: 110,
                        align:"center"
                    },
                    {
                        title: '请求方法',
                        dataIndex: 'method',
                        key: 'method',
                        width: 110,
                        align:"center"
                    },
                    {
                        title: '请求路径',
                        dataIndex: 'url',
                        key: 'url',
                        width: 240,
                        align:"center",
                        ellipsis:true
                    },
                    {
                        title: '接口类型',
                        dataIndex: 'type',
                        key: 'type',
                        width: 110,
                        align:"center",
                        customRender:function (text){
                           return text
                        }
                    },
                    {
                        title: '接口描述',
                        dataIndex: 'description',
                        key: 'description',
                        align:"center",
                        ellipsis:true
                    },
                    {
                        title: '修改时间',
                        dataIndex: 'updateTime',
                        key: 'updateTime',
                        align:"center"
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        align:"center"
                    },
                    {
                        title: '接口状态',
                        dataIndex: 'state',
                        key: 'state',
                        align:"center",
                        customRender:function (text){
                            if (text == 0) {
                                return "禁用";
                            } else {
                                return "启用";
                            }
                        }
                    },
                    {
                        title: '被调用次数',
                        dataIndex: 'useTotal',
                        key: 'useTotal',
                        align:"center"
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align:"center"
                    },
                ],
                interfcaeInfo:[],
                tags:[],
                loading:true,
                total:''
            };
        },
        mounted() {
            this.getInterfaceInfoList()
            this.getInterfaceTags()
        },
        methods:{
            async getInterfaceInfoList(){
                this.loading=true
                let param={

                }
               let res= await  getInterfaceInfoList(param)
                if(res.data.code === 0){
                    const {records,total} =res.data.data
                    this.total=total
                    this.interfcaeInfo=records
                    this.loading=false
                }
            },
            async getInterfaceTags(){
                let res = await getInterfaceTags();
                this.tags = res.data.data
            },
            async deleteInterface(id){
                let param={
                    id:''
                }
                param.id=id
                let res= await deleteInterface(param)
                if(res.data.code===0){
                    this.$message.success("删除成功")
                    this.getInterfaceInfoList()
                }else{
                    this.$message.error("删除失败")
                }
            },
            //上线
            async onlineInterfaceInfo(id){
                let param={
                    id:''
                }
                param.id=id
              let res= await onlineInterfaceInfo(param)
              if(res.data.code===0){
                  this.$message.success("已启用")
                  this.getInterfaceInfoList()
              }else{
                  this.$message.error("启用失败")
              }
            },
            //下线
            async offlineInterfaceInfo(id){
                let param={
                    id:''
                }
                param.id=id
                let res= await offlineInterfaceInfo(param)
                if(res.data.code===0){
                    this.$message.success("已禁用")
                    this.getInterfaceInfoList()
                }else{
                    this.$message.error("禁用失败")
                }
            },
            interfaceDetail(id){
              this.$router.push("/interface/detail/"+id)
            },
            editRecord(record) {
                // 编辑按钮点击事件，可以在这里执行编辑操作
                console.log('编辑记录:', record);
            },
            getCurrentStyle(current, today) {
                const style = {};
                if (current.date() === 1) {
                    style.border = '1px solid #1890ff';
                    style.borderRadius = '50%';
                }
                return style;
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
        margin-left: 10px;
    }
</style>