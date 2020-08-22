import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout';

Vue.use(Router);

// 路由常量
let constantRoutes = [
  {
    title: '重定向',
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: {title: '重定向', icon: 'home'},
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect')
      }
    ]
  },
  {
    title: '首页',
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    title: '登录',
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/Login'),
    hidden: true,
    meta: {title: '登录', icon: 'home'}
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta: {title: '404', icon: 'home'}
  },
  {
    title: "首次登陆修改密码",
    path: "/change/password",
    name: "changePassword",
    component: () => import("@/views/user/ChangePassword"),
    hidden: true,
    meta: {title: '修改密码', icon: 'home'}
  },
  {
    title: "选择企业",
    path: "/select/firm",
    name: "selectFirm",
    component: () => import("@/views/firm/Select"),
    hidden: true,
    meta: {title: '选择企业', icon: 'home'}
  }
];


const createRouter = () => new Router({
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition)
    if(savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
});


const router = createRouter();
router.reload = false;


// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
  router.reload = true;
}

export default router;
