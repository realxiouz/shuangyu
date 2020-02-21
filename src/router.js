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
      uri: '/login',
      component: () => import('@/views/Login'),
      hidden: true
    },
    {
      title: '首页',
      path: '/',
      name: 'index',
      uri: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          title: '首页',
          path: 'home',
          name: 'home',
          uri: '/home',
          component: () => import('@/views/Home'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '关于',
          path: 'about',
          name: 'about',
          uri: '/about',
          component: () => import('@/views/About'),
          meta: { title: 'About', icon: 'about' }
        }
      ]
    },
    {
      title: '用户管理',
      path: '/user',
      uri: '/user',
      component: Layout,
      children: [
        {
          title: '基本信息',
          path: 'index',
          name: 'User',
          uri: '/user/index',
          component: () => import('@/views/user/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '应用管理',
      path: '/app',
      uri: '/app',
      component: Layout,
      children: [
        {
          title: '基本信息',
          path: 'index',
          name: 'App',
          uri: '/app/index',
          component: () => import('@/views/app/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: 'Api管理',
      path: '/api',
      uri: '/api',
      component: Layout,
      children: [
        {
          title: '基本信息',
          path: 'index',
          name: 'Api',
          uri: '/api/index',
          component: () => import('@/views/api/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '角色管理',
      path: '/role',
      uri: '/role',
      component: Layout,
      children: [
        {
          title: '基本信息',
          path: 'index',
          name: 'role',
          uri: '/role/index',
          component: () => import('@/views/role/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '航班信息',
      path: '/airport',
      uri: '/airport',
      component: Layout,
      children: [
        {
          title: '机场信息',
          path: 'index',
          name: 'airport',
          uri: '/airport/index',
          component: () => import('@/views/airport/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '导航管理',
      path: '/nav',
      uri: '/nav',
      component: Layout,
      children: [
        {
          title: '导航管理',
          path: 'index',
          name: 'Nav',
          uri: '/nav/index',
          component: () => import('@/views/nav/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },{
      title: '航司信息',
      path: '/airline',
      uri: '/airline',
      component: Layout,
      children: [
        {
          title: '航司信息',
          path: 'index',
          name: 'airline',
          uri: '/airline/index',
          component: () => import('@/views/airline/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    }
  ]
});
