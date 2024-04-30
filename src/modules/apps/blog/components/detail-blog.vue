<template>
    <div class="content-center">
        <div style="width: 75%;margin: 0 auto">
            <div class="user-content">
                <a-avatar :src="$store.state.userImgUrl+blog.authoravatar" :size="60" icon="user" />
                <span style="font-size: 16px;margin-left: 20px;color: black">{{blog.authorname}}</span><br>
                <h1>{{blog.title}}</h1>
            </div>
            <div>
                <mavon-editor class="markdown"
                              v-model="blog.content"
                              :toolbarsFlag=false
                              :subfield=false
                              defaultOpen="preview"
                              :boxShadow="false"
                              style="z-index:0"
                ></mavon-editor>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        getBlogDetailInfo,
        insertComment,
        getCommentListByAuthorId
    } from '../api'
    export default {
        name: "detail-blog",
        data(){
            return{
                current: 0,
                steps: [
                    {
                        title: 'First',
                        content: 'First-content',
                    },
                    {
                        title: 'Second',
                        content: 'Second-content',
                    },
                    {
                        title: 'Last',
                        content: 'Last-content',
                    },
                ],
                preview:'preview',
                blog:{},
                comments: [],
                inputPlaceholder:'请先登录',
                childInputPlaceholder:'',
                flag:true,
                comment:{
                    articleId:'',
                    commentContent:'',
                    replyId:'',
                    parentId:'',
                    level:''
                },
                showReply:{},
                index:''
            }
        },
        mounted() {
            this.getBlogDetailInfo();
        },
        methods:{
            async getBlogDetailInfo(){
               let id=this.$route.params.id
                let res=await getBlogDetailInfo(id)
                if(res.data.code===0){
                   this.blog=res.data.data
                }
            },
            async getCommentListByAuthorId(){
                let id=this.$route.params.id
                let res=await getCommentListByAuthorId(id)
                if(res.data.code===0){
                    this.comments=res.data.data
                }
            },

        }
    }
</script>

<style scoped>
.user-content{
    position: relative;
    padding: 10px;
    border: 1px solid whitesmoke;
}
    .user-comment{
        margin-top: 20px;
    }
    .comment-list{
        margin-top: 10px;
        position: relative;
    }
    .comment-content{
        padding: 5px;
    }
    .comment-content-child{
        width: 95%;
        margin-left: 60px;
        margin-top: 5px;
    }
    p{
        width: 100%;
        text-indent: 60px;
        font-size: 16px;
    }
</style>