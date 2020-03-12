import Vue from 'vue';
import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/display.css';
import '@/styles/default.scss';
import App from './App';
import router from './router';
import store from './store';
import '@/permission';
import _ from 'lodash'
import moment from 'moment'
import numeral from 'numeral';

// import { mockXHR } from '../mock';
// if (process.env.NODE_ENV === 'development') {
//   mockXHR();
// }
Vue.prototype._ = _
Vue.prototype.$moment = moment
Vue.prototype.$numeral = numeral;
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
