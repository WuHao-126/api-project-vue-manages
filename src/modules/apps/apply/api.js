import request from "axios";
//写博客
export const getApplyCustomized = (param) =>{
    return request.post("/api/customized/all",param)
}