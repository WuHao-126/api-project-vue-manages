<template>
    <div style="margin-left: 50px">
        <div>
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="content"  v-show="current === 0">
                <div class="">
                    <span>接口名称：</span>
                    <a-input class="input" v-model="addInterfaceParam.name" :maxLength=15 placeholder="请输入接口名称" />
                </div>
                <div class="input-box">
                    <span>接口URL：</span>
                    <a-input class="input" v-model="addInterfaceParam.url"  placeholder="请输入接口地址" />
                </div>
                <div class="input-box">
                    <span>接口类型：</span>
                    <a-select default-value="GET"  style="width: 400px" @change="interfaceMethodSelect">
                        <a-select-option value="GET">
                            GET
                        </a-select-option>
                        <a-select-option value="POST">
                            POST
                        </a-select-option>
                    </a-select>
                </div>
                <div class="input-box">
                    <span>接口类型：</span>
                    <a-select :default-value="16"  style="width: 400px" @change="interfaceTypeSelect" >
                        <a-select-option :value="item.id" v-for="(item,index) in tags" :key="index">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </div>

                <div class="input-box">
                    <span>响应类型：</span>
                    <a-input class="input" v-model="addInterfaceParam.responseType" placeholder="请输入接口响应类型" />
                </div>
                <div class="input-box">
                    <span>接口描述：</span>
                    <a-textarea class="input" v-model="addInterfaceParam.description" placeholder="请输入接口描述" auto-size />
                </div>
                <div class="clearfix">
                    <a-upload
                            name="file"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            action="/api/upload/interface"
                            :before-upload="beforeUpload"
                            @change="handleChange"
                    >
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">
                                上传封面
                            </div>
                        </div>
                    </a-upload>
                </div>
                <!--        表格-->
                <request-header-table @getRequestHeaderParams="getRequestHeaderParams"></request-header-table>
                <request-param-table style="margin-top: 10px" @getRequestFieldParams="getRequestFieldParams"></request-param-table>
                <response-param-table style="margin-top: 10px" @getResponseFieldParams="getResponseFieldParams"></response-param-table>
                <error-params-table style="margin-top: 10px" @getErrorCode="getErrorCode"></error-params-table>

                <div style="margin-top: 30px">
                    <a-button type="primary" style="width: 300px;float: right" @click="clear" block>
                        清空
                    </a-button>
                </div>
            </div >
            <div class="content" v-show="current === 1">
                <div style="text-align: left">
                    <h4>请求地址</h4>
                    <a-input-search
                            style="width: 800px"
                            default-value="mysite"
                            v-model="addInterfaceParam.url"
                            size="large"
                            enter-button="发起请求"
                            @search="invokeInterface">
                        <a-select slot="addonBefore" default-value="Http://" style="width: 90px" >
                            <a-select-option value="Http://">
                                GET
                            </a-select-option>
                            <a-select-option value="Https://">
                                POST
                            </a-select-option>
                        </a-select>
                    </a-input-search>
                    <h4>请求地址</h4>
                    <div style="width: 60%;">
                        <a-table size="middle" :columns="textRequestParamColumns" :data-source="testRequestFieldParams" :pagination="false">
                            <span slot="name" slot-scope="text">{{ text }}</span>
                            <template slot="action" slot-scope="text, record, index">
                                <a-input v-model="record.value" />
                            </template>
                        </a-table>
                    </div>
                    <div style="margin-top: 30px">
                        <h4>响应参数</h4>
                        <div style="margin-top: 30px">
                            <h4>响应参数</h4>
                            <a-textarea
                                    style="font-size: 16px;font-weight: 800"
                                    v-model="addInterfaceParam.responseParamsExample"
                                    placeholder="Controlled autosize"
                                    :auto-size="{ minRows: 10 }"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="content" v-show="current === 2">
                    <mavon-editor class="markdown"
                                  v-model="addInterfaceParam.codeExample"
                                  :toolbarsFlag=true
                                  :subfield=false
                                  defaultOpen="edit"
                                  :boxShadow="true"
                                  style="z-index:0;width: 100%;height: 600px"
                    ></mavon-editor>
            </div>
            <div class="steps-action">
                <a-button  v-if="current > 0" style="width: 200px" @click="prev">
                    上一步
                </a-button>
                <a-button style="width: 200px;margin-left: 8px;" v-if="current < steps.length - 1" type="primary" @click="next">
                    下一步
                </a-button>
                <a-button
                        v-if="current == steps.length - 1"
                        type="primary"
                        style="width: 200px;margin-left: 8px"
                        @click="addInterface"
                >
                    保存
                </a-button>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        addInterfaceInfo,
        getInterfaceTags,
        invokeInteface
    } from "../api"
    import requestHeaderTable from './table/requestHeaderTable'
    import requestParamTable from "./table/requestParamTable";
    import responseParamTable from "./table/responseParamTable";
    import errorParamsTable from "@/modules/apps/interface/components/table/errorParamsTable";
    export default {
        name: "addInterface-info",
        components:{
            requestHeaderTable,
            requestParamTable,
            responseParamTable,
            errorParamsTable
        },
        data(){
            return{
                count: 2,
                loading:false,
                imageUrl: '',
                addInterfaceParam:{
                  name:'',
                  description:'',
                  url:'',
                  cover:'',
                  type:'16',
                  requestHeaderParams:'',
                  requestFieldParams:'',
                  responseFieldParams:'',
                  responseParamsExample:'',
                  errorCode:'',
                  codeExample:'',
                  responseType:'',
                  method:'GET',
                },
                tags:[],
                current: 0,
                steps: [
                    {
                        title: '接口信息',

                    },
                    {
                        title: '接口测试',
                    },
                    {
                        title: '参考代码',
                    }
                ],
                textRequestParamColumns: [
                    {
                        title: '名称',
                        dataIndex: 'fieldName',
                        key: 'fieldName',
                    },
                    {
                        title: '是否必填',
                        dataIndex: 'required',
                        key: 'required',
                    },
                    {
                        title: '类型',
                        dataIndex: 'type',
                        key: 'type',
                    },  {
                        title: '说明',
                        dataIndex: 'description',
                        key: 'description',
                    },
                    {
                        title: '值',
                        key: 'value',
                        scopedSlots: { customRender: 'action' }
                    },
                ],
                testRequestFieldParams:[],
                requestInvokeParam:{},
            }
        },
        mounted() {
           this.getInterfaceTags();
        },
        methods:{
            async getInterfaceTags(){
              let res = await getInterfaceTags();
              this.tags = res.data.data
            },
            async addInterface(){
                let param={
                   ...this.addInterfaceParam
                }
               let res=await addInterfaceInfo(param);
                if(res.data.code===0){
                    this.$message.success("添加成功")
                    this.addInterfaceParam={}
                    this.$router.go(0)
                }
            },
            async invokeInterface(value) {
                this.requestInvokeParam.url = value
                this.requestInvokeParam.requestHeaderParams = this.requestHeaderParams
                this.requestInvokeParam.requestFieldParams = this.testRequestFieldParams
                let param = {
                    ...this.requestInvokeParam
                }
                let res = await invokeInteface(param)
                if (res.data.code === 0) {
                    this.addInterfaceParam.responseParamsExample = res.data.data
                } else {
                    this.$message.error("请求失败")
                }
            },
            //图像上传方法
            handleChange(info) {
                this.addInterfaceParam.cover=info.file.response.data
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl;
                        console.log(this.imageUrl)
                        this.loading = false;
                    });
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                if (!isJpgOrPng) {
                    this.$message.error('只能上传图片!');
                }
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('文件大小不可以超过10MB!');
                }
                return isJpgOrPng && isLt2M;
            },
            interfaceMethodSelect(value){
                this.addInterfaceParam.method=value
            },
            interfaceTypeSelect(value) {
                this.addInterfaceParam.type=value
            },
            getRequestHeaderParams(val){
                val.forEach(obj => {
                    delete obj.addable;
                });
                this.addInterfaceParam.requestHeaderParams=JSON.stringify(val,null,2)
            },
            getRequestFieldParams(val){
                this.testRequestFieldParams=val
                val.forEach(obj => {
                    delete obj.addable;
                });
                this.addInterfaceParam.requestFieldParams=JSON.stringify(val,null,2)
            },
            getResponseFieldParams(val){
                val.forEach(obj => {
                    delete obj.addable;
                });
                this.addInterfaceParam.responseFieldParams=JSON.stringify(val,null,2)
            },
            getErrorCode(val){
                val.forEach(obj => {
                    delete obj.addable;
                });
                this.addInterfaceParam.errorCode=JSON.stringify(val,null,2)
            },
            clear(){
                this.addInterfaceParam={}
            },
            next() {
                this.current++;
            },
            prev() {
                this.current--;
            },
        }
    }
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
</script>

<style scoped>
    .avatar-uploader{
        margin-top: 10px;
    }
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .clearfix{
        margin-top: 20px;
    }
    .input-box{
        margin-top: 20px;
    }
    .input{
        width: 400px;
    }
    .editable-cell {
        position: relative;
    }

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        line-height: 18px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell:hover .editable-cell-icon {
        display: inline-block;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: #108ee9;
    }

    .editable-add-btn {
        margin-bottom: 8px;
    }
    .content{
        margin-top: 40px;

    }

    .steps-action {
        margin-top: 24px;
    }
</style>