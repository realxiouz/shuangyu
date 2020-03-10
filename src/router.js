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
      path: '/index',
      name: 'index',
      uri: '/index',
      component: Layout,
      redirect: '/home',
      children: [
        {
          title: '首页',
          path: '/home',
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
      title: '系统管理',
      path: '/admin',
      name: 'admin',
      uri: '/admin',
      component: Layout,
      children: [
        /*{
          title: '模板',
          path: '/temp/list',
          name: 'temp',
          uri: '/temp/list',
          component: () => import('@/views/temp/List'),
          meta: { title: 'Home', icon: 'home' },
        },*/
        {
          title: '用户管理',
          path: '/user/edit',
          uri: '/user/edit',
          component: () => import('@/views/user/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '应用管理',
          path: '/app',
          uri: '/app',
          component: () => import('@/views/app/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: 'Api管理',
          path: '/api',
          uri: '/api',
          component: () => import('@/views/api/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '角色管理',
          path: '/role',
          uri: '/role',
          component: () => import('@/views/role/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '第三方管理',
          path: '/thirdparty',
          name: 'thirdparty',
          uri: '/thirdparty',
          component: () => import('@/views/thirdparty/List'),
          meta: { title: 'Home', icon: 'home' },
        },
      ]
    },
    {
      title: '部门管理',
      path: '/dept',
      uri: '/dept',
      component: Layout,
      children: [
        {
          title: '基本信息',
          path: 'list',
          name: 'dept',
          uri: '/dept/List',
          component: () => import('@/views/dept/List'),
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
          component: () => import('@/views/nav/List'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '订单管理',
      path: '/order',
      uri: '/order',
      component: Layout,
      children: [
        {
          title: '订单信息',
          path: '/order/List',
          name: 'order',
          uri: '/order/List',
          component: () => import('@/views/order/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '订单报表',
          path: 'indexReport',
          name: 'indexReport',
          uri: '/order/indexReport',
          component: () => import('@/views/order/indexReport'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '跳转到',
          path: 'Edit_',
          name: 'Edit_',
          uri: '/order/Edit_',
          component: () => import('@/views/order/Edit_'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '派单规则',
          path: '/orderRule/list',
          name: 'orderRuleList',
          uri: '/orderRule/list',
          component: () => import('@/views/orderRule/List'),
          meta: {title: 'Home', icon: 'home'}
        }, {
          title: '规则编辑',
          path: '/orderRule/edit',
          name: 'orderRuleEdit',
          uri: '/orderRule/edit',
          component: () => import('@/views/orderRule/Edit'),
          props: {default: true, sidebar: false},
          meta: {title: 'Home', icon: 'home'}
        },
      ]
    },
    {
      title: '航班信息管理',
      path: '/flightInfo',
      name: 'flightInfo',
      uri: '/flightInfo',
      component: Layout,
      children: [
        /*{
          title: '机场信息',
          path: 'index',
          name: 'airport',
          uri: '/airport/index',
          component: () => import('@/views/airport/index'),
          meta: {title: 'Home', icon: 'home'}
        },*/
        {
          title: '机场信息',
          path: '/airport/list',
          uri: '/airport/list',
          component: () => import('@/views/airport/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        /*{
          title: '航司信息',
          path: 'index',
          name: 'airline',
          uri: '/airline/index',
          component: () => import('@/views/airline/index'),
          meta: {title: 'Home', icon: 'home'}
        },*/
        {
          title: '航司信息',
          path: '/airline/list',
          uri: '/airline/list',
          component: () => import('@/views/airline/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '退改规则',
          path: 'index',
          name: 'refundChangeRule',
          uri: '/refundChangeRule/index',
          component: () => import('@/views/refundChangeRule/index'),
          meta: {title: 'Home', icon: 'home'}
        },
        {
          title: '航段信息',
          path: 'index',
          name: 'flightSegment',
          uri: '/flightSegment/index',
          component: () => import('@/views/flightSegment/index'),
          meta: {title: 'Home', icon: 'home'}
        }
      ]
    },
    {
      title: '企业信息',
      path: '/firm',
      uri: '/firm',
      component: Layout,
      children: [
        {
          title: '企业管理',
          path: 'index',
          name: 'firm',
          uri: '/firm/index',
          component: () => import('@/views/firm/List'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '员工管理',
      path: '/staff',
      uri: '/staff',
      component: Layout,
      children: [
        {
          title: '员工管理',
          path: 'index',
          name: 'staff',
          uri: '/staff/index',
          component: () => import('@/views/staff/index'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    }
  ]
});
