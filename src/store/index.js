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
import policy from './modules/policy';
import dept from './modules/dept';
import app from './modules/app';
import api from './modules/api';
import order from './modules/order';
import staff from './modules/staff';
import thirdparty from './modules/thirdparty';
import orderRule from './modules/orderRule';
import thirdApiParam from './modules/thirdApiParam'
import productMark from './modules/productMark'

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
    thirdparty,
    orderRule,
    thirdApiParam,
    productMark
  },
  state: {},
  mutations: {},
  actions: {}
});
