<template>
    <div style="min-height: 700px">
        <div class="search">
            <span>日期：</span>
            <a-range-picker style="width: 250px" :locale="locale">
                <template slot="dateRender" slot-scope="current">
                    <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                        {{ current.date() }}
                    </div>
                </template>
            </a-range-picker>
            <span class="search-title">状态：</span>
            <a-select  style="width: 120px" @change="handleChange">
                <a-select-option value="jack">
                    同意
                </a-select-option>
                <a-select-option value="lucy">
                    下线
                </a-select-option>
            </a-select>
            <span class="search-title">名称：</span>
            <a-input style="width: 200px" placeholder="请输入接口名称" />
            <a-button style="margin-left: 20px" type="primary">
                搜索
            </a-button>
        </div>
        <a-table :columns="columns" :data-source="customizedList">
            <template slot="action" slot-scope="text, record">
                <a href="javascript:void(0)"  style="margin-left: 10px"  type="primary">同意</a>
                <a href="javascript:void(0)"  style="margin-left: 10px"  type="primary">拒绝</a>
            </template>
        </a-table>
    </div>

</template>
<script>
    const columns = [
        {
            title: '接口名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '申请用户名称',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '申请状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '预算（元）',
            dataIndex: 'budget',
            key: 'budget',
        },
        {
            title: '业务需求描述',
            key: 'demandDescription',
            dataIndex: 'demandDescription',
        },
        {
            title: '功能需求描述',
            key: 'functionDescription',
            dataIndex: 'functionDescription',
        },
        {
            title: '技术要求和限制',
            key: 'technologyDescription',
            dataIndex: 'technologyDescription',
        },
        {
            title: '创建时间',
            key: 'createDate',
            dataIndex: 'createDate',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align:"center"
        },
    ];

    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import { getApplyCustomized } from './api'
    export default {
        data() {
            return {
                locale,
                customizedList:[],
                columns,
            };
        },
        mounted() {
          this.getApplyCustomized()
        },
        methods:{
            async getApplyCustomized(){
                let param ={

                }
                let res = await getApplyCustomized(param)
                if(res.data.code===0){
                    console.log(res.data.data)
                    let { records, total}=res.data.data
                    this.customizedList=records
                }else{
                    this.$message.error(res.data.message)
                }
            }
        }
    };
</script>
<style>
    .search-title{
        margin-left: 10px;
    }
</style>