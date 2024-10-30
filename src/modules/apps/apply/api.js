import request from "../../../config/axios";
//写博客
export const getApplyCustomized = (param) =>{
    return request.post("/api/customized/all",param)
}

export const updateState = (param) =>{
    return request.post("/api/customized/update",param)
}