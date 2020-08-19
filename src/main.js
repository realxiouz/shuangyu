import Vue from 'vue';
import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/display.css';
import '@/styles/default.scss';
import "@/styles/getHtml.scss";
import App from './App';
import router from './router';
import store from './store';
import '@/permission';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import '@/utils/filter'

import VueCron from 'vue-cron';
Vue.use(VueCron);

Vue.prototype._ = _;
Vue.prototype.$moment = moment;
Vue.prototype.$numeral = numeral;
Vue.use(ElementUI, { locale, size: 'mini' });
Vue.config.productionTip = false;

import Card from '@/components/Card'
Vue.component('Card', Card)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title + " - 昆明双宇航空服务有限公司"
  }
  next();
});
