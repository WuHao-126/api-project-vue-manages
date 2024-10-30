<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider theme="dark" v-model="collapsed" collapsible>
            <div class="logo" v-if="!collapsed">
                <span>API Open Prafram</span>
            </div>
            <a-menu @click="routerChange" theme="dark" :default-selected-keys="['1']" mode="inline">
                <a-menu-item  key="/data">
                    <a-icon type="pie-chart" />
                    <span>数据监控</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="user" /><span>用户管理</span></span>
                    <a-menu-item key="/user">
                        用户列表
                    </a-menu-item>
                    <a-menu-item key="/user/add">
                        用户添加
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <span slot="title"><a-icon type="api" /><span>接口管理</span></span>
                    <a-menu-item key="/interface">
                        接口列表
                    </a-menu-item>
                    <a-menu-item key="/interface/add">
                        接口添加
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub3">
                    <span slot="title"><a-icon type="layout" /><span>网站管理</span></span>
                    <a-menu-item key="/web/info">
                        网站信息
                    </a-menu-item>
                    <a-menu-item key="/web/tag">
                        标签管理
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub5">
                    <span slot="title"><a-icon type="message" /><span>论坛管理</span></span>
                    <a-menu-item key="/blog">
                        博客列表
                    </a-menu-item>
                    <a-menu-item key="/blog/write">
                        添加博客
                    </a-menu-item>
                </a-sub-menu>
                <a-menu-item key="9">
                    <a-icon type="file" />
                    <span>设置</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0;height: 55px">
                <div style="line-height: 55px;float: right;margin-right: 20px">
                    <a-avatar :size="45" icon="user" />
                </div>
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
<!--                <a-breadcrumb style="margin: 16px 0">-->
<!--                    <a-breadcrumb-item>User</a-breadcrumb-item>-->
<!--                    <a-breadcrumb-item>Bill</a-breadcrumb-item>-->
<!--                </a-breadcrumb>-->
                <div :style="{ padding: '20px', background: '#fff', minHeight: '360px',marginTop:'10px' }">
                    <router-view/>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center;height: 20px;background-color: white">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    export default {
        data() {
            return {
                collapsed: false,
            };
        },
        methods:{
            routerChange({ key, keyPath }){
              console.log(key)
                if(this.$route.path === key){
                    this.$router.go(0)
                }else{
                    this.$router.push(key)
                }
            }
        }
    };
</script>

<style>
    #components-layout-demo-side .logo {
        height: 32px;
        background: black;
        margin: 16px;
        text-align: center;
        line-height: 32px;
        font-size: 18px;
        color: white;
        font-weight: 800;
    }
</style>