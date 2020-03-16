import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import role from './modules/role';
import nav from './modules/nav';
import airport from './modules/airport';
import airline from './modules/airline';
import refundChangeRule from './modules/refundChangeRule';
import flightSegment from './modules/flightSegment';
import firm from './modules/firm';
import dept from './modules/dept';
import policy from './modules/policy';
import app from './modules/app';
import api from './modules/api';
import order from './modules/order';
import staff from './modules/staff';
import thirdParty from './modules/thirdParty';
import thirdFlag from './modules/thirdFlag';
import orderRule from './modules/orderRule';
import thirdApiParam from './modules/thirdApiParam';
import productMark from './modules/productMark';
import fare from './modules/fare';
import thirdApiService from './modules/thirdApiService';
import thirdApiScheduler from './modules/thirdApiScheduler';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    role,
    airport,
    airline,
    nav,
    firm,
    policy,
    refundChangeRule,
    flightSegment,
    dept,
    app,
    api,
    order,
    staff,
    thirdParty,
    thirdFlag,
    orderRule,
    thirdApiParam,
    productMark,
    fare,
    thirdApiService,
    thirdApiScheduler
  },
  state: {},
  mutations: {},
  actions: {}
});
