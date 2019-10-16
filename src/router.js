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
      component: () => import('@/views/Login'),
      hidden: true
    },
    {
      title: '首页',
      path: '/',
      name: 'index',
      component: Layout,
      redirect: '/home',
      children: [
        {
          title: '首页',
          path: 'home',
          name: 'home',
          component: () => import('@/views/Home'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '关于',
          path: 'about',
          name: 'about',
          component: () => import('@/views/About'),
          meta: { title: 'About', icon: 'about' }
        }
      ]
    }
  ]
});
