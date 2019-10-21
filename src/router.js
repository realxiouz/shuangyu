import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout';

Vue.use(Router);

export default new Router({
  routes: [
    {
      title: '登录',
      path: '/login',
      name: 'login',
      uri:'/login',
      component: () => import('@/views/Login'),
      hidden: true
    },
    {
      title: '首页',
      path: '/',
      name: 'index',
      uri:'/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          title: '首页',
          path: 'home',
          name: 'home',
          uri:'/home',
          component: () => import('@/views/Home'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '关于',
          path: 'about',
          name: 'about',
          uri:'/about',
          component: () => import('@/views/About'),
          meta: { title: 'About', icon: 'about' }
        }
      ]
    },
    {
      title: '用户管理',
      path: '/user',
      uri:'/user',
      component: Layout,
      children: [
        {
          title: '基本信息',
          path: 'index',
          name: 'User',
          uri:'/user/index',
          component: () => import('@/views/user/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    }
  ]
});
