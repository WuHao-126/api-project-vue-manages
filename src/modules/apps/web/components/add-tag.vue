<template>
    <div id="components-table-demo-size">
        <span>标签列表</span>
        <a-button style="float: right;margin-bottom: 20px" type="primary" @click="()=>this.addTagVisible=true">添加</a-button>
        <a-table :columns="columns" :data-source="tags" size="small" :pagination=false>
           <span slot="action" slot-scope="text, record">
                <a @click="updateModelShow(record)">修改</a>
                <a-divider type="vertical" />
               <a-popconfirm title="确定要删除吗?" okText="确定" cancelText="取消"  @confirm="() =>deleteTag(record.id)">
                     <a>删除</a>
                </a-popconfirm>
            </span>
        </a-table>
        <div style="text-align: right;margin-top: 20px">
            <a-pagination v-model="current" :pageSize="16" :total="total" @change="pageChange" show-less-items />
        </div>
        <a-modal
                title="添加标签"
                :visible="addTagVisible"
                @ok="addTag"
                @cancel="handleCancel"
                okText="保存"
                cancelText="取消"
        >
            <span class="title">名称：</span>
            <a-input class="input" v-model="addParam.name" placeholder="标签名称" /><br><br>
            <span class="title">编码：</span>
            <a-input class="input" v-model="addParam.type" placeholder="标签类型编码" /><br><br>
            <span class="title">其他：</span>
            <a-input class="input" v-model="addParam.other" placeholder="其他" />
        </a-modal>
        <a-modal
                title="修改"
                :visible="updateTagVisible"
                @ok="updateTag"
                @cancel="handleCancel"
                okText="保存"
                cancelText="取消"
        >
            <span class="title">名称：</span>
            <a-input class="input" v-model="updateParam.name" placeholder="标签名称" /><br><br>
            <span class="title">编码：</span>
            <a-input class="input" v-model="updateParam.type" placeholder="标签类型编码" /><br><br>
            <span class="title">其他：</span>
            <a-input class="input" v-model="updateParam.other" placeholder="其他" />
        </a-modal>
    </div>
</template>
<script>
    import {
        getAllTags,
        deleteTag,
        addTag,
        updateTag
    } from "@/modules/apps/web/api";
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
                addTagVisible:false,
                updateTagVisible:false,
                tags:[],
                columns,
                total:'',
                requestParam:{
                    current:1,
                    size:16,
                },
                addParam:{},
                updateParam:{},
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
          },
            async deleteTag(id){
                let res =await deleteTag(id)
                if(res.data.code===0){
                    this.$message.success("标签删除成功");
                    this.getAllTags()
                }
            },
            async addTag(){
              let param={
                 ...this.addParam
              }
              let res = await addTag(param)
              if(res.data.code===0){
                  this.$message.success("添加成功")
                  this.addParam={}
                  this.addTagVisible=false
                  this.getAllTags()
              }else{
                  this.$message.error(res.data.message)
              }
            },
            async updateTag(){
               let res = await updateTag(this.updateParam)
                if(res.data.code===0){
                    this.$message.success("标签修改成功")
                    this.updateTagVisible=false
                }else{
                    this.$message.error(res.data.message)
                }
            },
            updateModelShow(record){
                this.updateTagVisible=true
                this.updateParam=record
            },
            handleCancel(){
              this.addTagVisible=false
                this.updateTagVisible=false
                this.addParam={}
                this.updateParam={}
            }
        },
    };
</script>
<style>
    #components-table-demo-size h4 {
        margin-bottom: 16px;
    }
    .title{
        font-size: 14px;
    }
    .input{
        width: 90%;
    }
</style>