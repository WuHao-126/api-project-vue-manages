import Vue from 'vue'
import Vuex from 'vuex'
import request from "axios";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    interfaceImgUrl:'http://182.92.7.24:9090/api/interface/',
    userImgUrl:'http://182.92.7.24:9090/api/user/',
    blogImgUrl:'http://182.92.7.24:9090/api/blog/',
    webImgUrl:'http://182.92.7.24:9090/api/',
  },
  getters: {
  },
  mutations: {

  },
  actions: {
      // getTages({ commit }){
      //   axios.get("/api/interface/tag").then((res)=>{
      //     if(res.data.code===0){
      //       commit('updateTags', res.data.data);
      //     }
      //   })
      // },
      // getCurrentLoginUser({commit}){
      //   let param = window.sessionStorage.getItem("user");
      //   let param1= localStorage.getItem("user");
      //   if(param!==null){
      //     axios.get("/api/user/current/"+param).then((res)=>{
      //       if(res.data.code===0){
      //          commit('updateUser',res.data.data)
      //       }
      //     })
      //   }else if(param1!==null){
      //     axios.get("/api/user/current/"+param).then((res)=>{
      //       if(res.data.code===0){
      //         commit('updateUser',res.data.data)
      //       }
      //     })
      //   }
      // }
  },
  modules: {
  }
})
