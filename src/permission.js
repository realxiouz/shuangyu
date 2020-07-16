import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';

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
        let routes = genMenus(await store.dispatch('nav/getTreeList', {}));
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
      let { uri, title, icon, navName, component, children } = i;
      let bean = {
        path: uri,
        meta: { title, icon },
        name: navName,
        component: _import(component)
      };
      if (children && children.length) {
        bean.children = genMenus(children);
      }
      return bean;
    });
}
