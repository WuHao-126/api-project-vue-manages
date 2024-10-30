import request from "../../../config/axios";
//写博客
export const insertBlog = (param) =>{
    return request.post("/api/blog/insert",param)
}
//博客列表
export const getBlogList = (param)=>{
    return request.post("/api/blog/page",param)
}
//获取博客详细信息
export const getBlogDetailInfo = (param) =>{
    return request.get("/api/blog/get/"+param)
}
//添加评论
export const insertComment = (param) =>{
    return request.post("/api/blog/insert/comment",param)
}
//根据文章ID获取评论列表
export const getCommentListByAuthorId = (param) =>{
    return request.get("/api/blog/comment/list/"+param)
}
//删除博客
export const deleteBlog = (param) => {
    return request.post("/api/blog/delete",param)
}