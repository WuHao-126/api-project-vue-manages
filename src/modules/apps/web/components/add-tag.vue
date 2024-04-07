<template>
    <div id="components-table-demo-size">
        <h4>标签列表</h4>
        <a-table :columns="columns" :data-source="tags" size="small" :pagination=false>
           <span slot="action" slot-scope="text, record">
               <a>修改</a>
                <a-divider type="vertical" />
               <a>删除</a>
            </span>
        </a-table>
        <div style="text-align: right;margin-top: 20px">
            <a-pagination v-model="current" :pageSize="16" :total="total" @change="pageChange" show-less-items />
        </div>

    </div>
</template>
<script>
    import {getAllTags} from "@/modules/apps/web/api";
    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            align:'center'
        },
        {
            title: '标签类型',
            dataIndex: 'type',
            align:'center'
        },
        {
            title: '其他（图标）',
            dataIndex: 'other',
            align:'center'
        },
        {
            title: '操作',
            key: 'action',
            align:'center',
            scopedSlots: { customRender: 'action' },
        },
    ];
    export default {
        data() {
            return {
                tags:[],
                columns,
                total:'',
                requestParam:{
                    current:1,
                    size:16,
                }
            };
        },
        mounted() {
            this.getAllTags()
        },
        methods:{
          async getAllTags(){
              let param={
                  ...this.requestParam
              }
              let res = await getAllTags(param)
              if(res.data.code===0){
                  const {total,records} = res.data.data
                 this.tags=records
                  this.total=total
              }else{
                  this.$message.error("获取标签失败")
              }
          },
            pageChange(page){
               this.requestParam.current=page
                this.getAllTags()
            }
        },
    };
</script>
<style>
    #components-table-demo-size h4 {
        margin-bottom: 16px;
    }
</style>