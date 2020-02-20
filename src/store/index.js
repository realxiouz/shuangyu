import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import role from './modules/role';
import airport from './modules/airport';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    role,
    airport
  },
  state: {},
  mutations: {},
  actions: {}
});
