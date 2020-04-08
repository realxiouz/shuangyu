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
      component: () => import('@/views/user/Login'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    {
      title: "首次登陆修改密码",
      path: "/change/password",
      name: "changePassword",
      component: () => import("@/views/user/ChangePassword"),
      hidden: true
    },
    {
      title: '首页',
      path: '/index',
      name: 'index',
      component: Layout,
      redirect: '/home',
      meta: { title: '首页', icon: 'home' },

      children: [
        {
          title: '首页',
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home'),
          meta: { title: '首页', icon: 'home' }
        },
        {
          title: '关于',
          path: '/about',
          name: 'about',
          component: () => import('@/views/About'),
          meta: { title: '关于', icon: 'about' }
        }
      ]
    },
    {
      title: '系统管理',
      path: '/admin',
      name: 'admin',
      redirect: '/user/list',
      component: Layout,
      meta: { title: '系统管理', icon: 'home' },

      children: [
        /*{
          title: '模板',
          path: '/temp/list',
          name: 'temp',
          component: () => import('@/views/temp/List'),
          meta: { title: 'Home', icon: 'home' },
        },*/
        {
          title: '用户管理',
          path: '/user/list',
          name: 'user',
          component: () => import('@/views/user/List'),
          meta: { title: '用户管理', icon: 'home' }
        },
        {
          title: '应用管理',
          path: '/app',
          naem: 'app',
          component: () => import('@/views/app/List'),
          meta: { title: '应用管理', icon: 'home' }
        },
        {
          title: '导航菜单管理',
          path: '/nav/list',
          name: 'nav',
          component: () => import('@/views/nav/List'),
          meta: { title: '导航菜单管理', icon: 'home' }
        },
        {
          title: 'Api管理',
          path: '/api',
          name: 'api',
          component: () => import('@/views/api/List'),
          meta: { title: 'Api管理', icon: 'home' }
        },
        {
          title: '角色管理',
          path: '/role/list',
          name: 'role',
          component: () => import('@/views/role/List'),
          meta: { title: '角色管理', icon: 'home' }
        },
        {
          title: '政策接口参数管理',
          path: '/thirdApiParam/list',
          name: 'thirdApiParam',
          component: () => import('@/views/thirdApiParam/List'),
          meta: { title: '政策接口参数管理', icon: 'home' },
        },
        {
          title: '产品标签管理',
          path: '/productMark/list',
          name: 'productMark',
          component: () => import('@/views/productMark/List'),
          meta: { title: '产品标签管理', icon: 'home' },
        },
        {
          title: '字典管理',
          path: '/dict/list',
          name: 'dict',
          component: () => import('@/views/dict/List'),
          meta: { title: '字典管理', icon: 'home' }
        }
      ]
    },
    {
      title: '订单管理',
      path: '/order',
      name: 'orderList',
      component: Layout,
      redirect: '/order/list',
      meta: { title: '订单管理', icon: 'home' },

      children: [
        {
          title: 'Pnrjy导单',
          path: '/pnrjyOrder/Export',
          name: 'pnrjyOrder',
          component: () => import('@/views/pnrjyOrder/Export'),
          meta: { title: 'Pnrjy导单', icon: 'home' }
        },
        {
          title: '订单信息',
          path: '/order/list',
          name: 'order',
          component: () => import('@/views/order/List'),
          meta: { title: '订单信息', icon: 'home' }
        },
        {
          title: '订单报表',
          path: '/orderReport/list',
          name: 'orderReport',
          component: () => import('@/views/orderReport/List'),
          meta: { title: '订单报表', icon: 'home' }
        },
        {
          title: '订单详情',
          path: '/order/detail',
          name: 'orderDetail',
          component: () => import('@/views/order/OrderDetail'),
          meta: { title: '订单详情', icon: 'home' }
        },
        {
          title: '出票',
          path: '/order/detail/go/ticket',
          name: 'goTicket',
          component: () => import('@/views/order/GoTicket'),
          meta: { title: '出票', icon: 'home' }
        },
        {
          title: '派单规则',
          path: '/order/rule/list',
          name: 'orderRuleList',
          component: () => import('@/views/orderRule/List'),
          meta: { title: '派单规则', icon: 'home' }
        }, {
          title: '规则编辑',
          path: '/order/rule/edit',
          name: 'orderRuleEdit',
          component: () => import('@/views/orderRule/Edit'),
          props: { default: true, sidebar: false },
          meta: { title: '规则编辑', icon: 'home' }
        },{
          title: '派单员工',
          path: '/order/staff/list',
          name: 'orderStaffList',
          component: () => import('@/views/orderStaff/List'),
          props: { default: true, sidebar: false },
          meta: { title: '派单员工', icon: 'home' }
        },{
          title: '员工上线',
          path: '/order/staff/online',
          name: 'orderStaffOnline',
          component: () => import('@/views/orderStaff/Online'),
          props: { default: true, sidebar: false },
          meta: { title: '派单员工', icon: 'home' }
        },
        {
          title: '订单任务',
          path: '/order/task/list',
          name: 'orderTask',
          component: () => import('@/views/orderTask/List'),
          meta: { title: '订单任务', icon: 'home' }
        },
        {
          title: '订单总报表',
          path: '/order/reportTotal/list',
          name: 'orderReportTotal',
          component: () => import('@/views/orderReportTotal/List'),
          meta: { title: '订单任务', icon: 'home' }
        },
      ]
    },
    {
      title: '航班信息管理',
      path: '/flightInfo',
      name: 'flightInfo',
      component: Layout,
      redirect: '/airline/list',
      meta: { title: '航班信息管理', icon: 'home' },

      children: [
        {
          title: '机场信息',
          path: '/airport/list',
          name: 'airportList',
          component: () => import('@/views/airport/List'),
          meta: { title: '机场信息', icon: 'home' }
        },
        {
          title: '航司信息',
          path: '/airline/list',
          name: 'airlineList',
          component: () => import('@/views/airline/List'),
          meta: { title: '航司信息', icon: 'home' }
        },
        {
          title: '退改规则',
          path: '/refund/change/rule/list',
          name: 'refundChangeRuleList',
          component: () => import('@/views/refundChangeRule/List'),
          meta: { title: '退改规则', icon: 'home' }
        },
        {
          title: '航段信息',
          path: '/segment/list',
          name: 'segmentList',
          component: () => import('@/views/flightSegment/List'),
          meta: { title: '航段信息', icon: 'home' }
        },
        {
          title: '票价信息',
          path: '/fare/list',
          name: 'fare',
          component: () => import('@/views/fare/List'),
          meta: { title: '票价信息', icon: 'home' }
        }
      ]
    },
    {
      title: '企业信息',
      path: '/firm',
      name: 'firm',
      component: Layout,
      redirect: '/firm/list',
      meta: { title: '企业信息', icon: 'home' },
      children: [
        {
          title: '企业管理',
          path: '/firm/list',
          name: 'firmList',
          component: () => import('@/views/firm/List'),
          meta: { title: '企业管理', icon: 'home' }
        },
        {
          title: '部门管理',
          path: '/dept/list',
          name: 'dept',
          component: () => import('@/views/dept/List'),
          meta: { title: '部门管理', icon: 'home' }
        },
        {
          title: '员工管理',
          path: '/staff/list',
          name: 'staff',
          component: () => import('@/views/staff/List'),
          meta: { title: '员工管理', icon: 'home' }
        }
      ]
    },
    {
      title: '政策信息',
      path: '/policy',
      name: 'policyList',
      component: Layout,
      redirect: '/policy/list',
      meta: { title: '政策信息', icon: 'home' },

      children: [
        {
          title: '政策管理',
          path: '/policy/list',
          name: 'policy',
          component: () => import('@/views/policy/List'),
          meta: { title: '政策管理', icon: 'home' }
        }
      ]
    },
    {
      title: '第三方Api管理',
      path: '/thirdApi',
      namr: 'thirdApi',
      component: Layout,
      redirect: '/third/party/list',
      meta: { title: '第三方Api管理', icon: 'home' },

      children: [
        {
          title: '第三方平台',
          path: '/third/party/list',
          name: 'thirdParty',
          component: () => import('@/views/thirdParty/List'),
          meta: { title: '第三方平台', icon: 'home' }
        },
        {
          title: '第三方Api',
          path: '/thirdApi/list',
          name: 'thirdApi',
          component: () => import('@/views/thirdApi/List'),
          meta: { title: '第三方Api', icon: 'home' }
        },
        {
          title: 'TGQ调度',
          path: '/tgq/product/list',
          name: 'tgqProductList',
          component: () => import('@/views/tgqProduct/List'),
          meta: { title: 'TGQ调度', icon: 'home' }
        }, {
          title: 'TGQ编辑',
          path: '/tgq/product/edit',
          name: 'tgqProductEdit',
          component: () => import('@/views/tgqProduct/Edit'),
          props: { default: true, sidebar: false },
          meta: { title: 'TGQ编辑', icon: 'home' }
        },
        {
          title: 'TTS调度',
          path: '/ttsScheduler/list',
          name: 'ttsSchedulerList',
          component: () => import('@/views/ttsScheduler/List'),
          meta: {title: 'TTS调度', icon: 'home'}
        },
        {
          title: 'TTS编辑',
          path: '/tts/scheduler/edit',
          name: 'ttsSchedulerEdit',
          component: () => import('@/views/ttsScheduler/Edit'),
          props: {default: true, sidebar: false},
          meta: {title: 'TTS编辑', icon: 'home'}
        },
        {
          title: '第三方标签',
          path: '/policy/flag/list',
          name: 'flag',
          component: () => import('@/views/policyFlag/List'),
          meta: { title: '第三方标签', icon: 'home' }
        },
        {
          title: '第三方标签参数',
          path: '/policy/flag/param/list',
          name: 'policyFlagParam',
          component: () => import('@/views/policyFlagParam/List'),
          meta: { title: '第三方标签参数', icon: 'home' }
        },
        {
          title: '第三方平台账号',
          path: '/third/account/list',
          name: 'account',
          component: () => import('@/views/thirdAccount/List'),
          meta: { title: '第三方平台账号', icon: 'home' }
        }

      ]
    },
    {
      title: '去哪儿',
      path: '/qunar',
      name: 'qunar',
      component: Layout,
      redirect: '/qunar/order',
      meta: { title: '去哪儿', icon: 'home' },

      children: [
        {
          title: '去哪儿订单管理',
          path: '/qunar/order',
          name: 'qunarOrder',
          component: () => import('@/views/qunarOrderConfig/List'),
          meta: { title: '去哪儿订单管理', icon: 'home' }
        },
        {
          title: '去哪儿订单通知管理',
          path: '/qunar/order/notify',
          name: 'qunarOrderNotify',
          component: () => import('@/views/qunarOrderNotifyConfig/List'),
          meta: { title: '去哪儿订单通知管理', icon: 'home' }
        },
        {
          title: '去哪儿政策管理',
          path: '/qunar/policy',
          name: 'qunarPolicyConfig',
          component: () => import('@/views/qunarPolicyConfig/List'),
          meta: { title: '去哪儿政策管理', icon: 'about' }
        }
      ]
    },
    {
      title: '财务管理',
      path: '/finance',
      name: 'finance',
      component: Layout,
      redirect: '/finance/list',
      meta: { title: '财务管理', icon: 'home' },
      children: [
        {
          title: '资金账号管理',
          path: '/finance/fund/account',
          name: 'fundAccount',
          component: () => import('@/views/fundAccount/List'),
          meta: { title: '资金账号管理', icon: 'home' }
        },
        {
          title: '订单管理',
          path: '/finance/order/list',
          name: 'financeOrder',
          component: () => import('@/views/financeOrder/List'),
          meta: { title: '订单管理', icon: 'home' }
        }
      ]
    },
    {
      path: "*",
      redirect: "/404",
      hidden: true
    }
  ]
});
