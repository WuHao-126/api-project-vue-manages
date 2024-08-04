<template>
    <div style="height: auto">
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item v-bind="formItemLayout">
              <span slot="label">
                头像
              </span>
                <div class="clearfix">
                    <a-upload
                       v-decorator="[
                       'userAvatar',
                      {
                        rules: [{ required: false, message: '请输入昵称!', }],
                      },
                    ]"
                            name="file"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            action="api/upload/image"
                            :before-upload="beforeUpload"
                            @change="handleChange"
                            :data="uploadType"
                    >
                        <img style="width: 100px;height: 100px" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">
                                上传头像
                            </div>
                        </div>
                    </a-upload>
                </div>
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label">
                昵称
              </span>
                <a-input
                       v-decorator="[
                       'userName',
                      {
                        rules: [{ required: true, message: '请输入昵称!', }],
                      },
                    ]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label">
                权限
              </span>
                <a-select style="width: 120px"   placeholder="权限"
                          v-decorator="[
                       'userRole',
                      {
                        rules: [{ required: true, message: '请输入权限!', }],
                      },
                    ]"
                >
                    <a-select-option value="superadmin">
                        超级管理员
                    </a-select-option>
                    <a-select-option value="admin">
                        管理员
                    </a-select-option>
                    <a-select-option value="user">
                        用户
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label">
                账号
              </span>
                <a-input
                        v-decorator="[
                      'userAccount',
                      {
                        rules: [{ required: true, message: '请输入账号!', whitespace: true }],
                      },
                    ]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label">
                邮箱
              </span>
                <a-input
                    v-decorator="[
                      'email',
                      {
                        rules: [
                          {
                            type: 'email',
                            message: '请输入正确的邮箱格式!',
                          },
                          {
                            required: false,
                            message: '请输入邮箱!',
                          },
                        ],
                      },
                    ]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout"  has-feedback>
               <span slot="label">
                密码:
                <a-tooltip title="请输入8~11位的数字、字母或者特殊字符">
                  <a-icon type="question-circle-o" />
                </a-tooltip>
              </span>
                <a-input
                    v-decorator="[
                      'userPassword',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请输入密码!',
                          },
                          {
                            validator: validateToNextPassword,
                          },
                        ],
                      },
                    ]"
                    type="password"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="确认密码:" has-feedback>
                <a-input
                    v-decorator="[
                      'checkPassword',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请输入密码!',
                          },
                          {
                            validator: compareToFirstPassword,
                          },
                        ],
                      },
                    ]"
                    type="password"
                    @blur="handleConfirmBlur"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="手机号:">
                <a-input
                    v-decorator="[
                      'phone',
                      {
                        rules: [{ required: false, message: '请输入手机号!' }],
                      },
                    ]"
                    style="width: 100%"
                    >
                </a-input>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
                <a-button type="primary" html-type="submit">
                    添加
                </a-button>
                <a-button @click="cancel" type="primary" style="margin-left: 20px">
                    取消
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    import {
        addUserInfo
    } from '../api'
    export default {
        data() {
            return {
                addUserParam:{},
                loading:false,
                imageUrl:'',
                confirmDirty: false,
                autoCompleteResult: [],
                formItemLayout: {
                    labelCol: {
                        xs: { span: 30 },
                        sm: { span: 5 },
                    },
                    wrapperCol: {
                        xs: { span: 30 },
                        sm: { span: 19 },
                    },
                },
                tailFormItemLayout: {
                    wrapperCol: {
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    },
                },
                addUserRequset:{}
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'register' });
        },
        methods: {
            uploadType(){
                return{
                   type:"user"
                }
            },
            async addUserInfo(param){
                let res = await addUserInfo(param);
                if(res.data.code===0){
                    this.$message.success("添加成功")
                    this.$emit("addVisible",false)
                }else{
                    this.$message.error(res.data.message)
                }
                return res.data.code
            },
            async handleSubmit(e) {
                e.preventDefault();
                await this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        if(values.userAvatar!=null){
                            values.userAvatar=values.userAvatar.file.name
                        }
                       let code=this.addUserInfo(values)
                        this.form.resetFields();
                    }
                });
            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            compareToFirstPassword(rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue('userPassword')) {
                    callback('两次密码输入不一致');
                } else {
                    callback();
                }
            },
            validateToNextPassword(rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(['confirm'], { force: true });
                }
                callback();
            },
            handleWebsiteChange(value) {
                let autoCompleteResult;
                if (!value) {
                    autoCompleteResult = [];
                } else {
                    autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
                }
                this.autoCompleteResult = autoCompleteResult;
            },
            handleChange(info) {
                this.form.userAvatar=info.file.response.data
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
            cancel(){
                console.log(111)
                this.form.resetFields()
                this.$emit("addVisible",false)
            }
        },
    };
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

    }
</style>