import request from "../../../config/axios";
//获取用户信息
export const getUserInfoList = (param) =>{
    return request.post("/api/user/list/page",param)
}
/**
 * 添加用户
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addUserInfo = (param) =>{
    return request.post("/api/user/register",param)
}
/**
 * 修改用户信息
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateUserInfo = (param) =>{
    return request.post("/api/user/update",param)
}
/**
 * 删除用户信息
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateUserState = (param) =>{
    return request.post("/api/user/state",param)
}