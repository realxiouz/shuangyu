import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout';

Vue.use(Router);

export default new Router({
  routes: [
    {
      title: '首页',
      path: '/',
      name: '/',
      component: Layout,
      redirect: '/home',
    },
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
      meta: {title: '首页', icon: 'home'},

      children: [
        {
          title: '首页',
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home'),
          meta: {title: '首页', icon: 'home'}
        },
        {
          title: '关于',
          path: '/about',
          name: 'about',
          component: () => import('@/views/About'),
          meta: {title: '关于', icon: 'about'}
        }
      ]
    },
    {
      title: '系统管理',
      path: '/admin',
      name: 'admin',
      redirect: '/user/list',
      component: Layout,
      meta: {title: '系统管理', icon: 'home'},
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
          meta: {title: '用户管理', icon: 'home'}
        },
        {
          path: '/user/personal/edit',
          component: () => import('@/views/user/personalEdit'),
          meta: {title: '修改个人信息', icon: 'home'}
        },
        {
          title: '导航菜单管理',
          path: '/nav/list',
          name: 'nav',
          component: () => import('@/views/nav/List'),
          meta: {title: '导航菜单管理', icon: 'home'}
        },
        {
          title: 'Api管理',
          path: '/api',
          name: 'api',
          component: () => import('@/views/api/List'),
          meta: {title: 'Api管理', icon: 'home'}
        },
        {
          title: '角色管理',
          path: '/role/list',
          name: 'role',
          component: () => import('@/views/role/List'),
          meta: {title: '角色管理', icon: 'home'}
        },
        {
          title: '产品标签管理',
          path: '/productMark/list',
          name: 'productMark',
          component: () => import('@/views/productMark/List'),
          meta: {title: '产品标签管理', icon: 'home'},
        }
      ]
    },
    {
      title: '订单管理',
      path: '/order',
      name: 'orderList',
      component: Layout,
      redirect: '/order/list',
      meta: {title: '订单管理', icon: 'home'},
      children: [
        {
          path: '/order/total/detail',
          component: () => import('@/views/orderTaskTotal/List'),
          meta: {title: '总订单任务', icon: 'home', keepAlive: true}
        },
        {
          title: '订单信息',
          path: '/order/list',
          name: 'order',
          component: () => import('@/views/order/List'),
          meta: {title: '订单信息', icon: 'home', keepAlive: true}
        },
        {
          title: '订单统计',
          path: '/order/time/list',
          name: 'orderTime',
          component: () => import('@/views/orderTime/List'),
          meta: {title: '订单统计', icon: 'home', keepAlive: true}
        },
        {
          title: '订单报表',
          path: '/orderReport/list',
          name: 'orderReport',
          component: () => import('@/views/orderReport/List'),
          meta: {title: '订单报表', icon: 'home', keepAlive: true}
        },
        {
          title: '订单详情',
          path: '/order/detail',
          name: 'orderDetail',
          component: () => import('@/views/order/OrderDetail'),
          meta: {title: '订单详情', icon: 'home'}
        },
        {
          title: '订单详情',
          path: '/order/detail2',
          name: 'orderDetail2',
          component: () => import('@/views/order/Detail'),
          meta: {title: '订单详情', icon: 'home'}
        },
        {
          title: '出票',
          path: '/order/detail/go/ticket',
          name: 'goTicket',
          component: () => import('@/views/order/GoTicket'),
          meta: {title: '出票', icon: 'home'}
        },
        {
          title: '派单规则',
          path: '/order/rule/list',
          name: 'orderRuleList',
          component: () => import('@/views/orderRule/List'),
          meta: {title: '派单规则', icon: 'home'}
        }, {
          title: '规则编辑',
          path: '/order/rule/edit',
          name: 'orderRuleEdit',
          component: () => import('@/views/orderRule/Edit'),
          props: {default: true, sidebar: false},
          meta: {title: '规则编辑', icon: 'home'}
        }, {
          title: '业务标签',
          path: '/order/staff/list',
          name: 'orderStaffList',
          component: () => import('@/views/orderStaff/List'),
          props: {default: true, sidebar: false},
          meta: {title: '业务标签', icon: 'home'}
        }, {
          title: '员工上线',
          path: '/order/staff/online',
          name: 'orderStaffOnline',
          component: () => import('@/views/orderStaff/Online'),
          props: {default: true, sidebar: false},
          meta: {title: '员工上线', icon: 'home'}
        },
        {
          title: '订单任务',
          path: '/order/task/list',
          name: 'orderTask',
          component: () => import('@/views/orderTask/List'),
          meta: {title: '订单任务', icon: 'home', keepAlive: true}
        },
        {
          title: '待处理订单任务',
          path: '/order/pending/task/list',
          name: 'pendingOrderTask',
          component: () => import('@/views/pendingOrderTask/List'),
          meta: {title: '待处理订单任务', icon: 'home'}
        },
        {
          title: '总订单任务',
          path: '/order/task/total/list',
          name: 'orderTaskTotal',
          component: () => import('@/views/orderTaskTotal/List'),
          meta: {title: '总订单任务', icon: 'home', keepAlive: true}
        },
        {
          title: '订单总报表',
          path: '/order/reportTotal/list',
          name: 'orderReportTotal',
          component: () => import('@/views/orderReportTotal/List'),
          meta: {title: '订单总报表', icon: 'home', keepAlive: true}
        },
        {
          title: '导单',
          path: '/order/export/order',
          name: 'exportOrder',
          component: () => import('@/views/order/ExportOrder'),
          meta: {title: '导单', icon: 'home'}
        },
        {
          title: '组长任务',
          path: '/order/order/task/group/list',
          name: 'orderTaskGroup',
          component: () => import('@/views/orderTaskGroup/List'),
          meta: {title: '组长任务', icon: 'home', keepAlive: true}
        },

      ]
    },
    {
      title: '航班信息管理',
      path: '/flightInfo',
      name: 'flightInfo',
      component: Layout,
      redirect: '/airline/list',
      meta: {title: '航班信息管理', icon: 'home'},

      children: [
        {
          title: '机场信息',
          path: '/airport/list',
          name: 'airportList',
          component: () => import('@/views/airport/List'),
          meta: {title: '机场信息', icon: 'home'}
        },
        {
          title: '航司信息',
          path: '/airline/list',
          name: 'airlineList',
          component: () => import('@/views/airline/List'),
          meta: {title: '航司信息', icon: 'home'}
        },
        {
          title: '退改规则',
          path: '/refund/change/rule/list',
          name: 'refundChangeRuleList',
          component: () => import('@/views/refundChangeRule/List'),
          meta: {title: '退改规则', icon: 'home'}
        },
        {
          title: '航段信息',
          path: '/segment/list',
          name: 'segmentList',
          component: () => import('@/views/flightSegment/List'),
          meta: {title: '航段信息', icon: 'home'}
        },
        {
          title: '票价信息',
          path: '/fare/list',
          name: 'fare',
          component: () => import('@/views/fare/List'),
          meta: {title: '票价信息', icon: 'home'}
        },
        {
          title: '票号信息',
          path: '/ticket/list',
          name: 'ticket',
          component: () => import('@/views/ticket/List'),
          meta: {title: '票号信息', icon: 'home'}
        },
        {
          title: '航班信息',
          path: '/flight/list',
          name: 'flight',
          component: () => import('@/views/flight/List'),
          meta: {title: '航班信息', icon: 'home'}
        },
        {
          title: '净票价信息',
          path: '/fare/net/list',
          name: 'netFare',
          component: () => import('@/views/netFare/List'),
          meta: {title: '净票价信息', icon: 'home'}
        }
      ]
    },
    {
      title: '工厂信息',
      path: '/factoryInfo',
      name: 'factoryInfo',
      component: Layout,
      redirect: '/factory/list',
      meta: {title: '工厂信息', icon: 'home'},
      children: [
        {
          title: '官网工厂',
          path: '/owp/list',
          name: 'owpList',
          component: () => import('@/views/owp/List'),
          meta: {title: '官网工厂', icon: 'home'}
        },
      ]
    },
    {
      title: '调度任务',
      path: '/jobSchedulerInfo',
      name: 'jobSchedulerInfo',
      component: Layout,
      redirect: '/job/scheduler/list',
      meta: {title: '调度任务', icon: 'home'},
      children: [
        {
          title: '调度标签',
          path: '/job/tag/list',
          name: 'jobTagList',
          component: () => import('@/views/jobTag/List'),
          meta: {title: '调度标签', icon: 'home'}
        },
        {
          title: '调度参数',
          path: '/job/config/list',
          name: 'jobConfigList',
          component: () => import('@/views/jobConfig/List'),
          meta: {title: '调度参数', icon: 'home'}
        },
        /* {
           title: '调度',
           path: '/job/scheduler/list',
           name: 'jobSchedulerList',
           component: () => import('@/views/jobScheduler/List'),
           meta: {title: '调度', icon: 'home'}
         },*/
      ]
    },
    {
      title: '工厂管理',
      path: '/factory',
      name: 'factory',
      component: Layout,
      redirect: '/factory',
      meta: {title: '工厂管理', icon: 'home'},
      children: [
        {
          title: 'tgq工厂',
          path: '/tgq/list',
          name: 'tgqList',
          component: () => import('@/views/tgq/List'),
          meta: {title: 'tgq工厂', icon: 'home'}
        },
        {
          title: 'wop工厂',
          path: '/wop/list',
          name: 'wopList',
          component: () => import('@/views/wop/List'),
          meta: {title: 'wop工厂', icon: 'home'}
        },
        {
          title: 'owp工厂',
          path: '/owp/list',
          name: 'owpList',
          component: () => import('@/views/owp/List'),
          meta: {title: 'owp工厂', icon: 'home'}
        }
      ]
    },
    {
      title: '企业信息',
      path: '/firm',
      name: 'firm',
      component: Layout,
      redirect: '/firm/list',
      meta: {title: '企业信息', icon: 'home'},
      children: [
        {
          title: '企业管理',
          path: '/firm/list',
          name: 'firmList',
          component: () => import('@/views/firm/List'),
          meta: {title: '企业管理', icon: 'home'}
        },
        {
          title: '供应商管理',
          path: '/supplier/list',
          name: 'supplierList',
          component: () => import('@/views/supplier/List'),
          meta: {title: '供应商管理', icon: 'home'}
        },
        {
          path: '/supplier/edit',
          component: () => import('@/views/supplier/Edit'),
          meta: {title: '添加供应商'}
        },
        {
          title: '客户管理',
          path: '/customer/list',
          name: 'customerList',
          component: () => import('@/views/customer/List'),
          meta: {title: '客户管理', icon: 'home'}
        },
        {
          title: '添加客户',
          path: '/customer/edit',
          component: () => import('@/views/customer/Edit'),
          meta: {title: '添加客户'}
        },
        {
          title: '部门管理',
          path: '/dept/list',
          name: 'dept',
          component: () => import('@/views/dept/List'),
          meta: {title: '部门管理', icon: 'home'}
        },
        {
          title: '员工管理',
          path: '/staff/list',
          name: 'staff',
          component: () => import('@/views/staff/List'),
          meta: {title: '员工管理', icon: 'home'}
        },
        {
          title: '类别管理',
          path: '/dict/list',
          name: 'dict',
          component: () => import('@/views/dict/List'),
          meta: {title: '类别管理', icon: 'home'}
        },
        {
          title: '应用管理',
          path: '/app/list',
          naem: 'app',
          component: () => import('@/views/app/List'),
          meta: {title: '应用管理', icon: 'home'}
        },
        {
          title: '客户去哪儿接口管理',
          path: '/qunar/config',
          name: 'qunarOrderConfig',
          component: () => import('@/views/customer/QunarConfig'),
          meta: {title: '客户去哪儿接口管理', icon: 'home'}
        },
        {
          title: '政策上传',
          path: '/tts/policy/job/scheduler/list',
          name: 'ttsPolicyJobSchedulerList',
          component: () => import('@/views/ttsPolicyJobScheduler/List'),
          meta: {title: '调度', icon: 'home'}
        },
        {
          title: '供应商蜗牛接口管理',
          path: '/woniu/config',
          name: 'woniuConfig',
          component: () => import('@/views/supplier/WoniuConfig'),
          meta: {title: '供应商蜗牛接口管理', icon: 'home'}
        },
        {
          path: '/supplier/bsp/config',
          component: () => import('@/views/supplier/BspConfig'),
          meta: {title: 'BSP账号配置'}
        },
        {
          title: 'eterm配置信息',
          path: '/eterm/config/list',
          name: 'etermConfig',
          component: () => import('@/views/etermConfig/List'),
          meta: {title: 'eterm配置信息', icon: 'home'},
        }
      ]
    },
    {
      title: '政策信息',
      path: '/policy',
      name: 'policyList',
      component: Layout,
      redirect: '/policy/list',
      meta: {title: '政策信息', icon: 'home'},

      children: [
        {
          title: '政策管理',
          path: '/policy/list',
          name: 'policy',
          component: () => import('@/views/policy/List'),
          meta: {title: '政策管理', icon: 'home'}
        }, {
          title: '官网产品',
          path: '/owp/list',
          name: 'owpList',
          component: () => import('@/views/owp/List'),
          meta: {title: '官网产品', icon: 'home'}
        }
      ]
    },
    {
      title: '开放平台管理',
      path: '/open',
      namr: 'open',
      component: Layout,
      redirect: '/open/list',
      meta: {title: '开放平台管理', icon: 'home'},

      children: [
        {
          title: '开放平台',
          path: '/open/list',
          name: 'open',
          component: () => import('@/views/openPlatform/List'),
          meta: {title: '开放平台', icon: 'home'}
        },
        {
          title: '平台授权',
          path: '/open/auth',
          name: 'auth',
          component: () => import('@/views/firmOpenAuth/List'),
          meta: {title: '平台授权', icon: 'home'}
        },
        {
          title: '开放平台API',
          path: '/openApi/list',
          name: 'openApi',
          component: () => import('@/views/openApi/List'),
          meta: {title: '开放平台API', icon: 'home'}
        },
        {
          title: 'TGQ调度',
          path: '/tgq/product/list',
          name: 'tgqProductList',
          component: () => import('@/views/tgqProduct/List'),
          meta: {title: 'TGQ调度', icon: 'home'}
        }, {
          title: 'TGQ编辑',
          path: '/tgq/product/edit',
          name: 'tgqProductEdit',
          component: () => import('@/views/tgqProduct/Edit'),
          props: {default: true, sidebar: false},
          meta: {title: 'TGQ编辑', icon: 'home'}
        },
        {
          title: '政策标签',
          path: '/policy/flag/list',
          name: 'flag',
          component: () => import('@/views/policyFlag/List'),
          meta: {title: '政策标签', icon: 'home'}
        },
        {
          title: '标签参数',
          path: '/policy/flag/param/list',
          name: 'param',
          component: () => import('@/views/policyFlagParam/List'),
          meta: {title: 'Open标签参数', icon: 'home'}
        },
        {
          title: '开放平台账号',
          path: '/open/account/list',
          name: 'account',
          component: () => import('@/views/openAccount/List'),
          meta: {title: '开放平台账号', icon: 'home'}
        },
        {
          title: '企业开放平台配置',
          path: '/firm/open/platform/list',
          name: 'firmOpenPlatformList',
          component: () => import('@/views/firmOpenPlatform/List'),
          meta: {title: '企业开放平台配置', icon: 'home'}
        }
      ]
    },
    {
      title: '去哪儿',
      path: '/qunar',
      name: 'qunarOrder',
      component: Layout,
      redirect: '/qunar/order/list',
      meta: {title: '去哪儿', icon: 'home'},
      children: [
        {
          title: '去哪儿订单管理',
          path: '/qunar/order/list',
          name: 'qunarOrderList',
          component: () => import('@/views/otherOrderConfig/qunarOrderConfig/List'),
          meta: {title: '去哪儿订单管理', icon: 'home'}
        },
        {
          title: '去哪儿导单',
          path: '/qunar/order/export',
          name: 'qunarOrderExport',
          component: () => import('@/views/otherOrderConfig/qunarOrderConfig/Export'),
          meta: {title: '去哪儿导单', icon: 'home'}
        },
        {
          title: '去哪儿订单详情',
          path: '/qunar/order/detail',
          name: 'qunarOrderDetail',
          component: () => import('@/views/otherOrderConfig/qunarOrderConfig/Detail'),
          meta: {title: '去哪儿订单详情', icon: 'home'}
        },
        {
          title: '去哪儿订单通知管理',
          path: '/qunar/notify/config',
          name: 'qunarNotifyConfig',
          component: () => import('@/views/customer/config/QunarNotifyConfig'),
          meta: {title: '去哪儿订单通知管理', icon: 'home'}
        },
        {
          title: '去哪儿订单接口管理',
          path: '/qunar/order/config',
          name: 'QunarOrderConfig',
          component: () => import('@/views/customer/config/QunarOrderConfig'),
          meta: {title: '去哪儿订单接口管理', icon: 'home'}
        },
        {
          title: '去哪儿订单更新管理',
          path: '/qunar/order/update/config',
          name: 'QunarOrderUpdateConfig',
          component: () => import('@/views/customer/config/QunarOrderUpdateConfig'),
          meta: {title: '去哪儿订单更新管理', icon: 'home'}
        },
        {
          title: '政策配置管理',
          path: '/qunar/policy/config/list',
          name: 'qunarPolicyConfig',
          component: () => import('@/views/qunarPolicyConfig/List'),
          meta: {title: '政策配置管理', icon: 'home'}
        },
        {
          title: '政策接口参数管理',
          path: '/qunar/policy/attr/list',
          name: 'qunarPolicyAttr',
          component: () => import('@/views/qunarPolicyAttr/List'),
          meta: {title: '政策接口参数管理', icon: 'home'},
        }
      ]
    },
    {
      title: 'BSP',
      path: '/bsp',
      name: 'bspList',
      component: Layout,
      redirect: '/bsp/order/list',
      meta: {title: 'BSP', icon: 'home'},

      children: [
        {
          title: 'BSP 订单管理',
          path: '/bsp/order/list',
          name: 'bspOrderList',
          component: () => import('@/views/otherOrderConfig/bspOrderConfig/List'),
          meta: {title: 'BSP 订单管理', icon: 'home'}
        },

      ]
    },
    {
      title: 'Pnrjy',
      path: '/pnrjy',
      name: 'pnrjy',
      component: Layout,
      redirect: '/pnrjy/order/list',
      meta: {title: 'Pnrjy', icon: 'home'},

      children: [
        {
          title: 'Pnrjy 订单管理',
          path: '/pnrjy/order/list',
          name: 'pnrjyOrderList',
          component: () => import('@/views/otherOrderConfig/pnrjyOrderConfig/List'),
          meta: {title: 'Pnrjy 订单管理', icon: 'home'}
        },
        {
          title: 'Pnrjy导单',
          path: '/pnrjy/order/Export',
          name: 'pnrjyOrderExport',
          component: () => import('@/views/otherOrderConfig/pnrjyOrderConfig/Export'),
          meta: {title: 'Pnrjy导单', icon: 'home'}
        },
      ]
    },
    {
      title: '蜗牛',
      path: '/woniu',
      name: 'woniuOrder',
      component: Layout,
      redirect: '/woniu/order/list',
      meta: {title: '蜗牛', icon: 'home'},

      children: [
        {
          title: '蜗牛订单管理',
          path: '/woniu/order/list',
          name: 'woniuOrderList',
          component: () => import('@/views/otherOrderConfig/woniuOrderConfig/List'),
          meta: {title: '蜗牛订单管理', icon: 'home'}
        },
      ]
    },
    {
      title: '财务管理',
      path: '/finance',
      name: 'finance',
      component: Layout,
      redirect: '/finance/list',
      meta: {title: '财务管理', icon: 'home'},
      children: [
        {
          title: '资金账号管理',
          path: '/finance/fund/account',
          name: 'fundAccount',
          component: () => import('@/views/fundAccount/List'),
          meta: {title: '资金账号管理', icon: 'home'}
        },
        {
          title: '科目管理',
          path: '/finance/account/subject',
          name: 'accountSubject',
          component: () => import('@/views/accountSubject/List'),
          meta: {title: '科目管理', icon: 'home'}
        },
        {
          title: '货币管理',
          path: '/finance/currency/list',
          name: 'currency',
          component: () => import('@/views/currency/List'),
          meta: {title: '货币管理', icon: 'home'}
        },
        {
          title: '仓库管理',
          path: '/finance/warehouse/list',
          name: 'warehouse',
          component: () => import('@/views/warehouse/List'),
          meta: {title: '仓库管理', icon: 'home'}
        },
        {
          title: '交易记录',
          path: '/finance/trade/list',
          name: 'trade',
          component: () => import('@/views/trade/List'),
          meta: {title: '交易记录', icon: 'home'}
        }
      ]
    },
    {
      title: '商品信息',
      path: '/product',
      name: 'productList',
      component: Layout,
      redirect: '/product/list',
      meta: {title: '商品信息', icon: 'home'},
      children: [
        {
          title: '商品管理',
          path: '/product/list',
          name: 'product',
          component: () => import('@/views/product/List'),
          meta: {title: '商品管理', icon: 'home'}
        },
        {
          title: '添加商品',
          path: '/product/config',
          name: 'productConfig',
          component: () => import('@/views/product/Add'),
          meta: {title: '添加商品', icon: 'home'}
        },
        {
          title: '编辑商品',
          path: '/product/edit',
          name: 'productEdit',
          component: () => import('@/views/product/Edit'),
          meta: {title: '添加商品', icon: 'home'}
        },
        {
          title: '商品属性管理',
          path: '/property/list',
          name: 'property',
          component: () => import('@/views/productProperty/List'),
          meta: {title: '商品属性管理', icon: 'home'}
        },
        {
          title: '设备功能管理',
          path: '/device/list',
          name: 'device',
          component: () => import('@/views/device/List'),
          meta: {title: '设备功能管理', icon: 'home'}
        },
        {
          title: '商品功能管理',
          path: '/feature/list',
          name: 'feature',
          component: () => import('@/views/productFeature/List'),
          meta: {title: '商品功能管理', icon: 'home'}
        },
        {
          title: '添加商品属性',
          path: '/property/config',
          name: 'propertyConfig',
          component: () => import('@/views/productProperty/Edit'),
          meta: {title: '商品属性管理', icon: 'home'}
        },
        {
          title: '品牌信息',
          path: '/brand/list',
          name: 'brand',
          component: () => import('@/views/brand/List'),
          meta: {title: '品牌信息', icon: 'home'}
        }, {
          title: '商品库存',
          path: '/product/inventory/list',
          name: 'inventory',
          component: () => import('@/views/productInventory/List'),
          meta: {title: '商品库存', icon: 'home'}
        },
        {
          title: '商品库存编辑',
          path: '/product/inventory/config',
          name: 'config',
          component: () => import('@/views/productInventory/Edit'),
          meta: {title: '商品库存编辑', icon: 'home'}
        },
        {
          title: '采购订单管理',
          path: '/product/purchase/order',
          name: 'productPurchaseOrder',
          component: () => import('@/views/productPurchaseOrder/List'),
          meta: {title: '采购订单管理', icon: 'home'}
        },
        {
          path: '/product/purchase/order/edit',
          component: () => import('@/views/productPurchaseOrder/Edit'),
          meta: {title: '采购订单', icon: 'home'}
        },
        {
          title: '采购入库单',
          path: '/purchase/receipt/order',
          name: 'purchaseReceiptOrder',
          component: () => import('@/views/purchaseReceiptOrder/List'),
          meta: {title: '采购入库单', icon: 'home'}
        },
        {
          path: '/purchase/receipt/order/edit',
          component: () => import('@/views/purchaseReceiptOrder/Edit'),
          meta: {title: '采购入库单', icon: 'home'}
        },
        {
          title: '采购退款单',
          path: '/purchase/return/order',
          name: 'purchaseReturnOrder',
          component: () => import('@/views/purchaseReturnOrder/List'),
          meta: {title: '采购退款单', icon: 'home'}
        },
        {
          path: '/purchase/return/order/edit',
          component: () => import('@/views/purchaseReturnOrder/Edit'),
          meta: {title: '采购入库单', icon: 'home'}
        },
        {
          title: ' 采购退票出库单',
          path: '/purchase/return/out/order',
          name: 'purchaseReturnOutOrder',
          component: () => import('@/views/purchaseReturnOutOrder/List'),
          meta: {title: ' 采购退票出库单', icon: 'home'}
        },
        {
          title: '采购改签单',
          path: '/purchase/change/order',
          name: 'purchaseChangeOrder',
          component: () => import('@/views/purchaseChangeOrder/List'),
          meta: {title: '采购改签单', icon: 'home'}
        },
        {
          title: '采购改签入库单',
          path: '/purchase/change/in/order',
          name: 'purchaseChangeInOrder',
          component: () => import('@/views/purchaseChangeInOrder/List'),
          meta: {title: '采购改签入库单', icon: 'home'}
        },
        {
          title: '采购改签出库单',
          path: '/purchase/change/out/order',
          name: 'purchaseChangeOutOrder',
          component: () => import('@/views/purchaseChangeOutOrder/List'),
          meta: {title: '采购改签出库单', icon: 'home'}
        },
        {
          title: '销售订单',
          path: '/product/sale/order',
          name: 'productSaleOrder',
          component: () => import('@/views/productSaleOrder/List'),
          meta: {title: '销售订单管理', icon: 'home'}
        },
        {
          path: '/product/sale/order/edit',
          component: () => import('@/views/productSaleOrder/Edit'),
          meta: {title: '销售订单', icon: 'home'}
        },
        {
          title: '销售出库单',
          path: '/product/shipment/order',
          name: 'saleShipmentOrder',
          component: () => import('@/views/saleShipmentOrder/List'),
          meta: {title: '销售出库单', icon: 'home'}
        },
        {
          path: '/product/shipment/order/edit',
          component: () => import('@/views/saleShipmentOrder/Edit'),
          meta: {title: '销售出库单', icon: 'home'}
        },
        {
          title: '销售退款单',
          path: '/sale/return/order',
          name: 'saleReturnOrder',
          component: () => import('@/views/saleReturnOrder/List'),
          meta: {title: '销售退款单', icon: 'home'}
        },
        {
          title: '销售退票入库单',
          path: '/sale/return/in/order',
          name: 'saleReturnInOrder',
          component: () => import('@/views/saleReturnInOrder/List'),
          meta: {title: '销售退票入库单', icon: 'home'}
        },
        {
          title: '销售改签单',
          path: '/sale/change/order',
          name: 'saleChangeOrder',
          component: () => import('@/views/saleChangeOrder/List'),
          meta: {title: '销售改签单', icon: 'home'}
        },
        {
          title: '销售改签入库单',
          path: '/sale/change/in/order',
          name: 'saleChangeInOrder',
          component: () => import('@/views/saleChangeInOrder/List'),
          meta: {title: '销售改签入库单', icon: 'home'}
        },
        {
          title: '销售改签出库单',
          path: '/sale/change/out/order',
          name: 'saleChangeOutOrder',
          component: () => import('@/views/saleChangeOutOrder/List'),
          meta: {title: '销售改签出库单', icon: 'home'}
        },
        {
          title: '其他入库',
          path: '/other/in/order',
          name: 'otherInOrder',
          component: () => import('@/views/otherInOrder/List'),
          meta: {title: '其他入库', icon: 'home'}
        },
        {
          title: '其他出库',
          path: '/other/out/order',
          name: 'otherOutOrder',
          component: () => import('@/views/otherOutOrder/List'),
          meta: {title: '其他出库', icon: 'home'}
        },
      ]
    },
    {
      path: "*",
      redirect: "/404",
      hidden: true
    }
  ]
});
