import request from 'axios'
//获取当前用户
export  const getCurrentUser = (param) => {
    return request.get("/api/user/current/"+param);
};

//退出当前用户登录
export  const logout = () =>{
    return request.post("/api/user/logout")
}
//获取用户信息
export const getUserInfoList = (param) =>{
    return request.post("/api/user/list/page",{param})
}
