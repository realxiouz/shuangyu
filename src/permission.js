import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import menu from './store/modules/menu';

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
      if (store.state.user.routes.length) {
        next();
      } else {
        // let { navs } = await store.dispatch('getLoginInfo', { firmId: null });
        // let tree = genTree(null, navs.filter(i => i.component));
        // console.log(tree);
        // let routes = genMenus(tree);
        let arr = await store.dispatch('menu/getTreeList', {})
        let routes = genMenus(arr)
        if (process.env.NODE_ENV == 'production') {
          routes.push({
            path: '/admin',
            name: 'Admin',
            component: _import('Layout'),
            hidden: true,
            meta: {title: '系统工具', icon: 'home'},
            children: [
              {
                path: '/nav/list',
                name: 'nav',
                component: _import('nav/List'),
                meta: {title: '导航菜单', icon: 'home'}
              },
              {
                path: '/role/list',
                name: 'nav',
                component: _import('role/List'),
                meta: {title: '角色管理', icon: 'home'}
              }
            ]
          })
        }
        routes.push({
          path: '*',
          component: _import('404'),
          hidden: true,
          meta: {title: '404', icon: 'home'}
        })
        store.commit('user/setRoutes', routes);
        router.addRoutes(routes);
        try {
          next({
            ...to
          });
        } catch (error) {
          console.log(error)
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
      let c = null;
      try {
        c = _import(component);
      } catch (error) {
        console.log('import error', error)
        c = _import('404');
      }
      let bean = {
        path: uri,
        meta: { title, icon },
        name: navName,
        component: c,
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
