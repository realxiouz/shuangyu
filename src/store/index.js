import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import role from './modules/role';
import nav from './modules/nav';
import airport from './modules/airport';
import airline from './modules/airline';
import refundChangeRule from './modules/refundChangeRule';
import flightSegment from './modules/flightSegment';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    role,
    airport,
    airline,
    nav,
    refundChangeRule,
    flightSegment
  },
  state: {},
  mutations: {},
  actions: {}
});
