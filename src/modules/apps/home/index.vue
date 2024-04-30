<template>
    <div class="box" title="数据监控面板">
        <div style="padding: 10px;">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-card class="resource-card"  :bordered="true">
                        <span>CPU使用率:</span>
                        <a-progress
                            :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                              }"
                            :percent="systemInfo.cpuUsed"
                        />
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card class="resource-card"  :bordered="true">
                        <span>内存使用率:</span>
                        <a-progress
                                :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                              }"
                                :percent="systemInfo.memoryUsed"
                        />
                    </a-card>
                </a-col>
                <a-col  :span="6">
                    <a-card class="resource-card"  :bordered="true">
                        <span>磁盘总量:</span>
                        <a-progress
                                :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                              }"
                                :percent="systemInfo.diskTotal"
                        />
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card class="resource-card"  :bordered="true">
                        <span>磁盘已用量（总量 {{systemInfo.diskTotal}}G）:</span>
                        <a-progress
                                :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                              }"
                                :percent="systemInfo.diskResidue"
                        />
                    </a-card>
                </a-col>
            </a-row>
        </div>
        <div style="padding: 10px;">
            <a-row :gutter="24">
                <a-col :span="16">
                    <div ref="chart" id="echarts">

                    </div>
                </a-col>
                <a-col :span="8">
                    <a-card class="web-info" title="网站信息数据">
                        <span>用户总数:</span>
                        <a-progress
                                :format="format"
                                :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#4f46e5',
                              }"
                                :percent="nums[0]"
                        />
                        <span>封禁用户数:</span>
                        <a-progress
                                :format="format"
                                :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#4f46e5',
                              }"
                                :percent="nums[1]"
                        />
                        <span>接口总数:</span>
                        <a-progress
                                :format="format"
                                :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#4f46e5',
                              }"
                                :percent="nums[2]"
                        />
                        <span>博客总数:</span>
                        <a-progress
                                :format="format"
                                :stroke-color="{
                                '0%': '#108ee9',
                                '100%': '#4f46e5',
                              }"
                                :percent="nums[3]"
                        />
                    </a-card>
                </a-col>
            </a-row>
        </div>

        <div style="padding: 10px;">
            <a-row :gutter="24">
                <a-col :span="16">
                    <a-card class="interface-table" title="接口响应情况">
                        <a-table :columns="columns" :data-source="timeoutInterfaceList" :pagination="false">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                        </a-table>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card class="error-table" title="系统报错表">
                        <a-list item-layout="horizontal" :data-source="exceptionalList" size="small">
                            <a-list-item slot="renderItem" slot-scope="item, index" size="small">
                                <a-list-item-meta
                                        :description="item.description"
                                        size="small"
                                >
                                <span style="color: rgba(255,0,132,0.86)" slot="title">{{ item.name }} (状态码：{{item.code}})</span>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
    const columns = [
        {
            title: 'API接口名称',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: { customRender: 'name' },
            align:"center"
        },
        {
            title: 'API接口地址',
            dataIndex: 'url',
            key: 'url',
            ellipsis:true,
            align:"center"
        },
        {
            title: '接口响应时间(秒)',
            dataIndex: 'responseTime',
            key: 'responseTime',
            ellipsis: true,
            align:"center"
        },
        {
            title: '发生时间',
            dataIndex: 'createTime',
            key: 'createTime',
            ellipsis: true,
            align:"center"
        },
        {
            title: '操作',
            dataIndex: 'createTime',
            key: 'createTime',
            ellipsis: true,
        },
    ];
    const data1 = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    import {
        getSystem,
        getStatistics,
        getTimeoutList,
        getExceptionalList
    } from './api'
    import * as echarts from 'echarts';
    export default{
        data () {
            return {
                data1,
                columns,
                systemInfo:{
                    //cpu利用率
                    cpuUsed:10,
                    //内存占用率
                    memoryUsed:20,
                    //磁盘总量
                    diskTotal:30,
                    //磁盘剩余量
                    diskResidue:40,
                    //磁盘已用量
                    usedDiaskTotal:50
                },
                nums:[],
                timeoutInterfaceList:[],
                exceptionalList:[],
                option : {
                    title: {
                        text: '网站信息数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['用户数量', '接口使用数量', '博客数量', '用户封禁数量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月','六月','七月','八月','九月','十月','十一月','十二月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '用户数量',
                            type: 'line',
                            stack: 'Total',
                            data: [120, 200, 250, 300, 380, 600, 851,900,906,1000,1111,1231]
                        },
                        {
                            name: '接口使用数量',
                            type: 'line',
                            stack: 'Total',
                            data: [220, 182, 191, 234, 290, 330, 100,80,199,164,700,800]
                        },
                        {
                            name: '博客数量',
                            type: 'line',
                            stack: 'Total',
                            data: [150, 232, 201, 154, 190, 330, 410,600,700,800,900,1000]
                        },
                        {
                            name: '用户封禁数量',
                            type: 'line',
                            stack: 'Total',
                            data: [320, 332, 301, 334, 390, 330, 320,100,200,600,700,900]
                        },
                    ]
                },
            };
        },
        mounted(){
           this.getSystemInfoCpu();
           this.getSystemStatistics();
           this.getEcharts();
           this.getTimeoutList();
           this.getExceptionalList();
        },

        methods: {
            getEcharts(){
                // 使用 `echarts.init` 初始化图表
                const myChart = echarts.init(this.$refs.chart);
                console.log(myChart)
                // 使用 `setOption` 方法设置图表的配置选项和数据
                myChart.setOption(this.option);
            },
            format(percent, successPercent){
                return percent
            },
            async getSystemInfoCpu(){
               let res = await getSystem();
               if(res.data.code ===0){
                   this.systemInfo=res.data.data
               }
            },
            async getSystemStatistics(){
                let res= await getStatistics();
                if(res.data.code ===0 ){
                   this.nums=res.data.data
                }else{
                    this.$message.error("获取统计数据失败")
                }
            },
            async getTimeoutList(){
                let param = {

                }
                let res = await getTimeoutList(param)
                if(res.data.code === 0 ){
                     this.timeoutInterfaceList = res.data.data.records
                }else{
                    this.$message.error("获取超时列表失败")
                }
            },
            async getExceptionalList(){
                let param={

                }
                let res = await getExceptionalList(param)
                if(res.data.code === 0){
                    this.exceptionalList=res.data.data.records
                }else{
                    this.$message.error("获取异常列表失败")
                }
            }
        }
    }

</script>

<style scoped>

    .box{
        width: 100%;
        height: auto;
        border: 1px solid white;
        background-color: white;
    }
    .system_title{
        font-size: 18px;
        color:#666666;
        box-sizing: border-box;
        margin-left: 30px;
        margin-top: 10px;
        font-weight: 800
    }
    .system_content_box span{
        position: absolute;
        font-size: 14px;
        color: #666666;
        top:40px;
        left: 25px;
    }
    .resource-card{
        border-radius: 15px;
    }
    #echarts{
        padding: 15px;
        overflow: hidden;
        border: 1px solid #eeeeee;
        width: 100%;
        height: 300px;
        display: inline-block;
        border-radius: 15px;
    }
    .web-info{
        width: 100%;
        height: 300px;
        border-radius: 15px;
    }
    .interface-table{
        border-radius: 15px;
        width: 100%;
        min-height: 600px;
    }
    .error-table{
        border-radius: 15px;
        width: 100%;
        min-height: 600px;
    }
</style>