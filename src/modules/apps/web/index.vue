<template>
    <div class="content">
        <div>
            <div class="clearfix">
                <h3>网站LOGO：</h3>
                <a-upload
                        name="file"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="api/upload/logo"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                >
                    <img v-if="webInfo.logo" :src="imageUrl" alt="avatar" />
                    <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                            上传封面
                        </div>
                    </div>
                </a-upload>
            </div>
            <br />
            <h3>网站名称：</h3>
            <a-input placeholder="请输入网站名称" allow-clear v-model="webInfo.name" />
            <br />
            <br />
            <h3>网站描述：</h3>
            <a-textarea placeholder="请输入网站描述" allow-clear v-model="webInfo.description" />
            <br />
            <br />
            <a-button type="primary" @click="updateWebInfo" style="float: right;width: 100px;height: 40px">
                修改
            </a-button>
            <br />
            <br />
            <h3>网站公告：</h3>
            <a-textarea placeholder="请输入网站公告" allow-clear @change="onChange" />
            <div>
                <a-input-number id="inputNumber" v-model="webInfo.notice" :min="1" :max="10" />
                当前值：{{ value }}
            </div>
            <br />
            <br />
            <a-button type="primary" @click="releaseNotice"  style="float: right;width: 100px;height: 40px">
                发布
            </a-button>
        </div>
    </div>
</template>

<script>
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    import {
        getWebInfo,
        updateWebInfo,
        releaseNotice
    } from './api'
    export default {
        name: "index",
        data(){
            return{
                webInfo:'',
                loading: false,
                imageUrl: '',
            }
        },
        mounted() {
          this.getWebInfo();
        },
        methods: {
            onChange(e) {
                console.log(e);
            },
            async getWebInfo(){
                let res = await getWebInfo();
                if(res.data.code ===0 ){
                   this.webInfo=res.data.data
                   this.imageUrl=this.$store.state.webImgUrl+this.webInfo.logo
                }else{
                    this.$message.error("获取网站信息失败")
                }
            },
            async updateWebInfo(){
                let param = {
                    ...this.webInfo
                }
               let res = await updateWebInfo(param)
               if(res.data.code === 0 ){
                   this.getWebInfo()
                   this.$message.success("修改成功")
               }else{
                   this.$message.error("修改网站信息失败")
               }
            },
            async releaseNotice(){
               let param ={
                   ...this.webInfo
               }
               let res= await releaseNotice(param)
                if(res.data.code===0){
                    this.$message.success("发布成功")
                }else{
                    this.$message.error("发布失败")
                }
            },
            handleChange(info) {
                this.blog.cover=info.file.response.data
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl;
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
        },
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
</style>