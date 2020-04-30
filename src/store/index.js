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
import firmMerchant from "./modules/firmMerchant";
import dept from "./modules/dept";
import policy from "./modules/policy";
import app from "./modules/app";
import api from "./modules/api";
import order from "./modules/order";
import orderReport from "./modules/orderReport";
import staff from "./modules/staff";
import open from "./modules/open";
import policyFlag from "./modules/policyFlag";
import policyFlagParam from "./modules/policyFlagParam";
import orderRule from "./modules/orderRule";
import openApiParam from "./modules/openApiParam";
import productMark from "./modules/productMark";
import fare from "./modules/fare";
import openApiService from "./modules/openApiService";
import openAccount from "./modules/openAccount";
import tgqProduct from "./modules/tgqProduct";
import pnrjyOrder from "./modules/pnrjyOrder";
import qunarOrderConfig from "./modules/qunarOrderConfig";
import qunarOrderNotifyConfig from "./modules/qunarOrderNotifyConfig";
import qunarPolicyConfig from "./modules/qunarPolicyConfig";
import orderStaff from "./modules/orderStaff";
import ttsScheduler from "./modules/ttsScheduler";
import category from "./modules/category";
import dict from "./modules/dict";
import fundAccount from "./modules/fundAccount";
import orderTask from "./modules/orderTask"
import orderReportTotal from "./modules/orderReportTotal"
import ticket from "./modules/ticket"
import flight from "./modules/flight";
import netFare from "./modules/netFare";
import accountSubject from "./modules/accountSubject";
import orderTaskTotal from "./modules/orderTaskTotal";
import currency from "./modules/currency";
import trade from "./modules/trade";
import warehouse from "./modules/warehouse";
import woniuConfig from "./modules/woniuConfig";
import qunarOrderController from "./modules/qunarOrderController";
import product from "./modules/product";
import productProperty from "./modules/productProperty";
import brand from "./modules/brand";
import firmContact from "./modules/firmContact";
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
    firmMerchant,
    policy,
    refundChangeRule,
    flightSegment,
    dept,
    app,
    api,
    order,
    orderReport,
    staff,
    open,
    policyFlag,
    policyFlagParam,
    orderRule,
    openApiParam,
    productMark,
    fare,
    openApiService,
    openAccount,
    tgqProduct,
    pnrjyOrder,
    qunarOrderConfig,
    qunarOrderNotifyConfig,
    qunarPolicyConfig,
    orderStaff,
    ttsScheduler,
    category,
    dict,
    orderTask,
    fundAccount,
    orderReportTotal,
    ticket,
    flight,
    netFare,
    accountSubject,
    orderTaskTotal,
    currency,
    trade,
    woniuConfig,
    warehouse,
    qunarOrderController,
    product,
    productProperty,
    brand,
    firmContact
  },
  state: {
    loginInfo: {}
  },
  mutations: {
    SET_LOGIN_INFO: (state, data) => {
      state.loginInfo = data;
    },
    SET_MENUS: (state, array) => {
      state.menus = array;
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
