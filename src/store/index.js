import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import role from "./modules/role";
import nav from "./modules/nav";
import airport from "./modules/airport";
import airline from "./modules/airline";
import refundChangeRule from "./modules/refundChangeRule";
import flightSegment from "./modules/flightSegment";
import firm from "./modules/firm";
import dept from "./modules/dept";
import policy from "./modules/policy";
import app from "./modules/app";
import api from "./modules/api";
import order from "./modules/order";
import staff from "./modules/staff";
import thirdParty from "./modules/thirdParty";
import policyFlag from "./modules/policyFlag";
import policyFlagParam from "./modules/policyFlagParam";
import orderRule from "./modules/orderRule";
import thirdApiParam from "./modules/thirdApiParam";
import productMark from "./modules/productMark";
import fare from "./modules/fare";
import thirdApiService from "./modules/thirdApiService";
import thirdAccount from "./modules/thirdAccount";
import tgqProduct from "./modules/tgqProduct";
import pnrjyOrder from "./modules/pnrjyOrder";

import { getLoginInfo } from "@/api/staff";

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
    policyFlag,
    policyFlagParam,
    orderRule,
    thirdApiParam,
    productMark,
    fare,
    thirdApiService,
    thirdAccount,
    tgqProduct,
    pnrjyOrder
  },
  state: {
    loginInfo: {}
  },
  mutations: {
    SET_LOGIN_INFO: (state, data) => {
      state.loginInfo = data;
    }
  },
  actions: {
    getLoginInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const { firmId } = params;
        getLoginInfo(firmId)
          .then(response => {
            const { data } = response;
            commit("SET_LOGIN_INFO", data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
