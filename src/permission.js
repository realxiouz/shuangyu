import router from './router';
import store from './store';
import {Message} from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {getToken} from '@/utils/auth';

NProgress.configure({showSpinner: false});

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;
  const hasToken = getToken();
  if (hasToken) {
    if (to.path.startsWith('/login')) {
      next({path: '/'});
      NProgress.done();
    } else {
      try {
        if (!store.getters.userId) {
          store.dispatch('staff/getLoginInfo', {firmId: null}).then(data => {
            if (data.menus) {
              let routerList = getRouterList(data.menus);
              router.addRoutes(routerList);
              router.reload = false;
            }
            if (data.firms.length > 1 && !data.staffId) {
              next({path: `/select/firm`});
            } else {
              next({...to, replace: true});
            }
          });
        } else {
          if (router.reload) {
            let menus = store.getters.menus;
            let routerList = getRouterList(menus);
            router.addRoutes(routerList);
            router.reload = false;
            next({...to, replace: true});
          } else {
            next();
          }
        }
      } catch (error) {
        console.log(error);
        await store.dispatch('user/resetToken');
        Message.error(error || 'Has Error');
        next(`/login?redirect=${to.path}`);
        NProgress.done();
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

function loadComponent(component) {
  return () => import(`@/views/${component}.vue`);
}


function getRouterList(menus) {
  return menus
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
      try {
        c = loadComponent(component);
      } catch (error) {
        console.log('import error', error);
        c = loadComponent('404');
      }
      let r = {
        path: uri,
        meta: {title, icon, keepAlive},
        name: menuName,
        component: c,
        sort,
        hidden: !enable
      };
      if (children && children.length) {
        r.children = getRouterList(children);
      }
      return r;
    });
}
