import request from "axios";

/**
 * 获取网站信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getWebInfo = ()=>{
    return request.get("/api/web")
}
/**
 * 修改网站信息
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateWebInfo = (param) =>{
    return request.post("/api/web",param)
}

export const releaseNotice = (param) => {
    return request.post("/api/web/notice",param)
}