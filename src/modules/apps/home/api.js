import request from "axios";

/**
 * 获得系统资源数据
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getSystem = ()=> {
    return request.post("api/sys/cpu")
}
/**
 * 获得用户等相关数据总数
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getStatistics = ()=> {
    return request.get("api/sys/statistics")
}
/**
 * 获得超时接口列表
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTimeoutList = (param) =>{
    return request.get("api/web/timeout",param)
}
/**
 * 获取异常列表
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getExceptionalList = (param) =>{
    return request.get("api/web/exceptional",param)
}
