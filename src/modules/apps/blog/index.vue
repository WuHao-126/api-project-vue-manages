<template>
    <div class="content">
        <div class="search">
            <span>日期：</span>
            <a-range-picker style="width: 250px" v-model="dataRange" @change="dateChange"  :locale="locale" format="yyyy-MM-DD HH:mm">
                <template slot="dateRender" slot-scope="current" :locale="locale">
                    <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                        {{ current.date() }}
                    </div>
                </template>
            </a-range-picker>
<!--            <span class="search-title">作者：</span>-->
<!--            <a-input default-value="" style="width: 120px" placeholder="作者名称">-->
<!--            </a-input>-->
            <span  class="search-title">文章标题：</span>
            <a-input v-model="queryParam.title" style="width: 200px" placeholder="请输入标题" />
            <a-button @click="getBlogList" style="margin-left: 20px" type="primary">
                搜索
            </a-button>
            <a-button @click="clear" style="margin-left: 10px" type="primary">
                清空
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
                <a href="javascript:void(0)" style="margin-left: 10px" @click="goBlogDetail(record.id)" type="primary">详细</a>
                <a-popconfirm title="确定要删除吗？" okText="确认" cancelText="取消" @confirm="()=>deleteBlog(record.id)">
                    <a href="javascript:void(0)" style="margin-left: 10px"  type="primary">删除</a>
                </a-popconfirm>

            </template>
        </a-table>
    </div>
</template>
<script>

    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import
    {
        getBlogList,
        deleteBlog,
    } from './api'
    export default {
        data() {
            return {
                dataRange:'',
                queryParam:{},
                locale,
                columns : [
                    {
                        title: '博客标题',
                        dataIndex: 'title',
                        key: 'title',
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
            this.getBlogList()
            this.tags=this.$store.state.tags
        },
        methods:{
            aaa(tags){
                console.log(tags)
            },
            async getBlogList(){
                this.loading=true
                let param={
                    ...this.queryParam
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
                    this.getBlogList()
                }else{
                    this.$message.error("删除失败")
                }
            },
            goBlogDetail(id){
                this.$router.push("/blog/detail/"+id)
            },
            getCurrentStyle(current, today) {
                const style = {};
                if (current.date() === 1) {
                    style.border = '1px solid #1890ff';
                    style.borderRadius = '50%';
                }
                return style;
            },
            dateChange(date, dateString) {
                this.queryParam.beginDate=dateString[0]
                this.queryParam.endDate=dateString[1]
            },
            clear(){
                this.queryParam={}
                this.dateChange=''
                this.getBlogList()
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