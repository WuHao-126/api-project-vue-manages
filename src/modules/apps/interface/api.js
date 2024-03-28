import request from "axios";
//获取接口分页列表
export const getInterfaceInfoList = (param) =>{
    return request.post("/api/interface/page",param)
}
//发布接口
export const onlineInterfaceInfo = (param) =>{
    return request.post("/api/interface/online",param)
}
//下线接口
export const offlineInterfaceInfo = (param) =>{
    return request.post("/api/interface/offline",param)
}
//修改接口信息
export const updateInterfaceInfo = (param) =>{
    return request.post("/api/interface/update",param)
}
//添加接口
export const addInterfaceInfo = (param) =>{
    return request.post("/api/interface/add",param)
}
//获取接口标签
export const getInterfaceTags = () =>{
    return request.get("/api/interface/tag")
}
//删除接口
export const deleteInterface = (param)=>{
    return request.post("/api/interface/delete",param)
}
//测试接口
export const invokeInteface = (param) =>{
    return request.post("/api/interface/invoke",param)
}
// 根据ID获取接口详细
export const getByIdInterfaceInfo = (param)=>{
    return request.get("/api/interface/get/"+param)
}