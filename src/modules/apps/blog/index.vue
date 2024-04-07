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
            <span class="search-title">作者：</span>
            <a-select default-value="" style="width: 120px" @change="handleChange">
                <a-select-option :value="item.id" v-for="(item,index) in tags" :key="index">
                    {{item.name}}
                </a-select-option>
            </a-select>
            <span class="search-title">文章标题：</span>
            <a-input style="width: 200px" placeholder="请输入标题" />
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

        <a-table :columns="columns" :data-source="blogList" :loading=loading size="middle" rowKey="id">
             <span slot="tags" slot-scope="tags">
                  <a-tag
                          @click="aaa(tags)"
                          v-for="item in tags"
                          :key="item"
                          :color="item === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                  >
                    {{ item.toUpperCase() }}
                  </a-tag>
             </span>
            <template slot="action" slot-scope="text, record">
                <a href="javascript:void(0)" v-if="record.istop === 0" style="margin-left: 10px" @click="deleteInterface(record.id)" type="primary">置顶</a>
                <a href="javascript:void(0)" v-if="record.istop === 1"  style="margin-left: 10px" @click="deleteInterface(record.id)" type="primary">取消置顶</a>
                <a href="javascript:void(0)" style="margin-left: 10px" @click="goBlogDetail(record.id)" type="primary">详细</a>
                <a href="javascript:void(0)" style="margin-left: 10px" @click="deleteBlog(record.id)" type="primary">删除</a>
            </template>
        </a-table>
    </div>
</template>
<script>

    import
    {
        getBlogList,
        deleteBlog,
    } from './api'
    export default {
        data() {
            return {
                columns : [
                    {
                        title: '博客标题',
                        dataIndex: 'title',
                        key: 'title',
                        align:"center"
                    },
                    {
                        title: '博客作者',
                        dataIndex: 'authorname',
                        key: 'authorName',
                        align:"center"
                    },
                    {
                        title: '博客标签',
                        dataIndex: 'tag',
                        key: 'tag',
                        align:"center",
                        scopedSlots: { customRender: 'tags' },
                        customRender:function (text){
                            let tags=JSON.parse(text)
                            console.log(tags)
                            return tags
                        }
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createtime',
                        key: 'createtime',
                        align:"center",
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align:"center"
                    },
                ],
                loading:true,
                blogList:[],
                tags:[]
            };
        },
        mounted() {
            this.getBlogTagList()
            this.tags=this.$store.state.tags
        },
        methods:{
            aaa(tags){
                console.log(tags)
            },
            async getBlogTagList(){
                this.loading=true
                let param={

                }
                let res = await getBlogList(param)
                if(res.data.code===0){
                    this.blogList=res.data.data.records
                    this.loading=false
                }
            },
            async deleteBlog(id){
                let param={
                   id:id
                }
                let res = await  deleteBlog(param)
                if(res.data.code === 0){
                    this.$message.success("删除成功")
                    this.getBlogTagList()
                }else{
                    this.$message.error("删除失败")
                }
            },
            goBlogDetail(id){
                this.$router.push("/blog/detail/"+id)
            }
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