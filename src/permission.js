import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import menu from './store/modules/menu';
import { resetRoute } from "@/router";

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;
  const hasToken = getToken();
  if (hasToken) {
    if (to.path.startsWith('/login')) {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (!store.state.user.needGetMenu) {
        next();
      } else {
        let { menus } = await store.dispatch('getLoginInfo', { firmId: null });
        let tree = genTree(null, menus);
        let routes = genMenus(tree);

        // let m = await store.dispatch('getMenu');
        // let routes = genMenus(m);

        // let arr = await store.dispatch('menu/getTreeList', {});
        // let routes = genMenus(arr);

        routes.push({
          path: '*',
          component: _import('404'),
          hidden: true,
          meta: { title: '404', icon: 'home' }
        });
        store.commit('user/setRoutes', routes);
        router.addRoutes(routes);
        store.commit('user/setNeedGetMenu', false);
        console.log(routes);
        try {
          next({
            ...to,
            replace: true
          });
        } catch (error) {
          console.log(error);
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

let _import = path => _ => import(`@/views/${path}.vue`);

function genMenus(arr) {
  return arr
    .sort((i, j) => i.sort - j.sort)
    .map(i => {
      let {
        uri,
        title,
        icon,
        menuName,
        component,
        children,
        sort,
        tags,
        enable,
        keepAlive
      } = i;
      let c = null;
      let isNav = (tags || []).findIndex(i => i === 'NAV') > -1;
      let cPath = isNav ? 'Layout' : component;
      try {
        c = _import(cPath);
      } catch (error) {
        console.log('import error', error);
        c = _import('404');
      }
      let bean = {
        path: uri,
        meta: { title, icon, keepAlive },
        name: menuName,
        component: c,
        sort,
        hidden: !enable
      };
      if (children && children.length) {
        bean.children = genMenus(children);
      }
      return bean;
    });
}

function genTree(pid, arr) {
  let tree = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid === pid) {
      tree.push(arr[i]);
    }
  }
  if (tree.length > 0) {
    for (let i = 0; i < tree.length; i++) {
      let children = genTree(tree[i].menuId, arr);
      tree[i].children = children;
    }
  }
  return tree;
}
