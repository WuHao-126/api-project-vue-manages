import request from "axios";


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
    return request.post("/api/web/notice",param)
}
//获取所有标签
export const getAllTags = (param) =>{
    return request.post("/api/web/all/tag?current="+param.current+"&"+"size="+param.size);
}
