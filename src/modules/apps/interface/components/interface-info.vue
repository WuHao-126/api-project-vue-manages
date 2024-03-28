<template>
    <div>
    </div>


</template>

<script>
    import axios from 'axios'
    // import 'prismjs/themes/prism.css'; // 引入 Prism.js 样式
    // import 'prismjs/components/prism-json.min'; // 引入 JSON 语法支持

    export default {
        name: "SeeInterfaceInfoPage",
        data(){
            return{
                isNoShow:false,
                responseResult:'',
                InterfaceInfoInvokeRequest:{
                    id:'',
                    userRequestParams:'',
                },
                interface:{
                    id: '',
                    name: "",
                    description: "",
                    method: "",
                    url: "",
                    requestHeader: "",
                    requestParams: "",
                    responseHeader: "",
                    status: '',
                    createTime: "",
                    updateTime: "",
                },
                flag:false
            }
        },
        mounted() {
            Prism.highlightAll()
            this.SelectInterfaceInfoById();
        },
        methods:{
          SelectInterfaceInfoById(){
              let id=this.$route.params.id
              axios.get("/api/interface/get/"+id).then((res)=>{
                  if(res.data.code==0){
                      this.interface=res.data.data
                      this.interface.requestParams=this.interface.requestParams.trim()
                      this.InterfaceInfoInvokeRequest.userRequestParams=this.interface.requestParams
                  }
              })
          },
           changeJson(json){;
               // const jsonString = JSON.stringify(json, null, 2);
               // 使用 Prism.js 来高亮显示 JSON 数据
               return Prism.highlight(json, Prism.languages.json, 'json');
           },
          invokeInterfaceInfo(){
              if(this.interface.status==1){
                  this.InterfaceInfoInvokeRequest.id=this.interface.id
                  axios.post("/api/interface/invoke",this.InterfaceInfoInvokeRequest).then((res)=>{
                      if(res.data.code==0){
                          // if(this.isJson(res.data.data)){
                          console.log(res.data.data)
                              this.responseResult=res.data.data
                          // }else{
                          //     this.responseResult=res.data.data
                          // }
                          // this.responseResult=res.data.data
                          this.isNoShow=true
                      }
                  })
              }else{
                  this.$message.error("该接口状态为关闭，无法调用")
              }

          },
            isJson(str){
                if (typeof str == 'string') {
                    try {
                        var obj=JSON.parse(str);
                        if(typeof obj == 'object' && obj ){
                            return true;
                        }else{
                            return false;
                        }

                    } catch(e) {
                        console.log('error：'+str+'!!!'+e);
                        return false;
                    }
                }
            }
        },
    }
</script>

<style scoped>
    .text {
        font-size: 15px;
        float: left;
    }
    .requestParam-box{
        display: inline-block;
        width: auto;
        height: auto;
        margin-left: 50px;
    }
    .item {
        margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
        margin-top: 20px;
    }
    .InterfaceInfo{
       margin-top: 20px;
    }
    .el-button{
        margin-top: 20px;
    }
    .responseParams{
        font-size: 16px;
    }
    pre{
        width: 400px;
    }
    /*.code-block {*/
    /*    font-family: 'Courier New', monospace;*/
    /*    background-color: #f4f4f4;*/
    /*    padding: 10px;*/
    /*    color: #333;*/
    /*}*/



</style>