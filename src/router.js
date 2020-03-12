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
      component: () => import('@/views/user/Login'),
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
          title: '导航菜单管理',
          path: '/nav/index',
          name: 'nav',
          uri: '/nav/index',
          component: () => import('@/views/nav/List'),
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
          title: '政策接口参数管理',
          path: '/thirdApiParam',
          name: 'thirdApiParam',
          uri: '/thirdApiParam',
          component: () => import('@/views/thirdApiParam/List'),
          meta: { title: 'Home', icon: 'home' },
        },
        {
          title: '产品标签管理',
          path: '/productMark',
          name: 'productMark',
          uri: '/productMark',
          component: () => import('@/views/productMark/List'),
          meta: { title: 'Home', icon: 'home' },
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
          path: '/orderReport/List',
          name: 'orderReport',
          uri: '/orderReport/List',
          component: () => import('@/views/orderReport/List'),
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
        {
          title: '机场信息',
          path: '/airport/list',
          name: 'airportList',
          uri: '/airport/list',
          component: () => import('@/views/airport/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '航司信息',
          path: '/airline/list',
          name: 'airlineList',
          uri: '/airline/list',
          component: () => import('@/views/airline/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '退改规则',
          path: '/refund/change/rule/list',
          name: 'refundChangeRuleList',
          uri: '/refund/change/rule/list',
          component: () => import('@/views/refundChangeRule/List'),
          meta: {title: 'Home', icon: 'home'}
        },
        {
          title: '航段信息',
          path: '/segment/list',
          name: 'segmentList',
          uri: '/segment/list',
          component: () => import('@/views/flightSegment/List'),
          meta: {title: 'Home', icon: 'home'}
        },
        {
          title: '票价信息',
          path: '/fare/index',
          name: 'fare',
          uri: '/fare/index',
          component: () => import('@/views/fare/List'),
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
          path: '/firm/index',
          name: 'firm',
          uri: '/firm/index',
          component: () => import('@/views/firm/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '部门管理',
          path: '/dept/list',
          name: 'dept',
          uri: '/dept/list',
          component: () => import('@/views/dept/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '员工管理',
          path: '/staff/list',
          name: 'staff',
          uri: '/staff/list',
          component: () => import('@/views/staff/List'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '政策信息',
      path: '/policy',
      uri: '/policy',
      component: Layout,
      children: [
        {
          title: '政策管理',
          path: '/policy/index',
          name: 'policy',
          uri: '/policy/index',
          component: () => import('@/views/policy/List'),
          meta: { title: 'Home', icon: 'home' }
        }
      ]
    },
    {
      title: '第三方Api管理',
      path: '/thirdApi',
      uri: '/thirdApi',
      component: Layout,
      children: [
        {
          title: '第三方平台',
          path: '/third/party',
          name: 'thirdParty',
          uri: '/third/party/list',
          component: () => import('@/views/thirdParty/List'),
          meta: { title: 'Home', icon: 'home' }
        },
        {
          title: '第三方Api',
          path: '/thirdApi/index',
          name: 'thirdApi',
          uri: '/thirdApi/index',
          component: () => import('@/views/thirdApi/List'),
          meta: { title: 'Home', icon: 'home' }
        }

      ]
    },

  ]
});
