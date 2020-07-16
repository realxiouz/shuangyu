import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import nav from './store/modules/nav';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (store.state.user.routes.length) {
        next();
      } else {
        let { navs } = await store.dispatch('getLoginInfo', { firmId: null });
        let tree = genTree(null, navs.filter(i => i.component));
        console.log(tree);
        let routes = genMenus(tree);
        store.commit('user/setRoutes', routes);
        router.addRoutes(routes);
        try {
          next({
            ...to
          });
        } catch (error) {
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
    .filter(i => i.component)
    .map(i => {
      let { uri, title, icon, navName, component, children, sort } = i;
      let bean = {
        path: uri,
        meta: { title, icon },
        name: navName,
        component: _import(component),
        sort
      };
      if (children && children.length) {
        bean.children = genMenus(children).sort((i, j) => i.sort - j.sort);
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
      let children = genTree(tree[i].navId, arr);
      tree[i].children = children;
    }
  }
  return tree;
}
