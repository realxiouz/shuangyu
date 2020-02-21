import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import role from './modules/role';
import airport from './modules/airport';
import airline from './modules/airline';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    role,
    airport,
    airline
  },
  state: {},
  mutations: {},
  actions: {}
});
