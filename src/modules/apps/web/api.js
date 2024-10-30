import request from "../../../config/axios";


//获取网站信息
export const getWebInfo = ()=>{
    return request.get("/api/web")
}
//修改网站信息
export const updateWebInfo = (param) =>{
    return request.post("/api/web",param)
}
//通知
export const releaseNotice = (param) => {
    return request.post("/api/web/notice/save",param)
}
//获取所有标签
export const getAllTags = (param) =>{
    return request.post("/api/web/all/tag?current="+param.current+"&"+"size="+param.size);
}
//删除标签
export const deleteTag = (param) =>{
    return request.get("/api/web/tag/delete?id="+param)
}
//添加标签
export const addTag =(param) => {
    return request.post("/api/web/tag/add",param)
}
//修改标签
export const updateTag =(param) => {
    return request.post("/api/web/tag/update",param)
}
//取消公告
export const deleteNotice =() =>{
    return request.get("/api/web/notice/delete")
}
