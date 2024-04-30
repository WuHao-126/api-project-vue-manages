import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);
const router =new VueRouter({
  mode:"history",
  routes:[
    {
      path:"/",
      redirect:"/index"
    },
    {
      path: "/login",
      component:() => import('../modules/apps/login/login')
    },
    {
      path:"/index",
      component:() => import('../components/layout/index'),
      redirect: "/index",
      children:[
        {
          path:'/index',
          component: () => import('../modules/apps/home/index')
        },
        {
          path:'/interface',
          component: () =>  import('../modules/apps/interface/index')
        },
        {
          path:'/interface/add',
          component: () =>  import('../modules/apps/interface/components/add-Interfaceinfo')
        },
        {
          path:'/user',
          component: () => import('../modules/apps/user/index')
        },
        {
          path: '/user/add',
          component: () => import('../modules/apps/user/components/add-user')
        },
        {
          path: '/see/:id',
          component: () => import('../modules/apps/interface/components/interface-info')
        },
        {
          path:'/interface/detail/:id',
          component: () =>  import('../modules/apps/interface/components/interface-detail')
        },
        {
          path:'/interface/applyadd',
          component: () =>  import('../modules/apps/apply/apply-add')
        },
        {
          path:'/interface/customized',
          component: () =>  import('../modules/apps/apply/apply-customized')
        },
        {
          path: '/blog',
          component: () => import('../modules/apps/blog/index')
        },
        {
          path:'/blog/write',
          component: () => import('../modules/apps/blog/components/write-blog')
        },
        {
          path:'/blog/detail/:id',
          component: () => import('../modules/apps/blog/components/detail-blog')
        },
        {
          path: '/web/info',
          component: () => import('../modules/apps/web/index')
        },
        {
          path: '/web/tag',
          component: () => import('../modules/apps/web/components/add-tag')
        },
      ]
    },
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path === '/login' || to.path === '/'){
    next()
  }else{
    let user=window.sessionStorage.getItem("user");

    if(user !== null){
      next();
    }else{
      next("/login")
    }
  }
})
export default router