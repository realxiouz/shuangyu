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
import qunarPolicyParam from "./modules/qunarPolicyParam";
import productMark from "./modules/productMark";
import fare from "./modules/fare";
import openApiService from "./modules/openApiService";
import openAccount from "./modules/openAccount";
import tgqProduct from "./modules/tgqProduct";
import qunarOrderConfig from "./modules/otherOrderConfig/qunarOrderConfig";
import qunarOrderNotifyConfig from "./modules/otherOrderConfig/qunarOrderNotifyConfig";
import qunarPolicyConfig from "./modules/otherOrderConfig/qunarPolicyConfig";
import orderStaff from "./modules/orderStaff";
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
import productInventory from "./modules/productInventory";
import productProperty from "./modules/productProperty";
import brand from "./modules/brand";
import firmContact from "./modules/firmContact";
import firmAccount from "./modules/firmAccount";
import bspConfig from "./modules/bspConfig";
import productOrder from "./modules/productOrder";
import productOrderDetail from "./modules/productOrderDetail";
import bspOrderConfig from "./modules/otherOrderConfig/bspOrderConfig";
import pnrjyOrderConfig from "./modules/otherOrderConfig/pnrjyOrderConfig";
import woniuOrderConfig from "./modules/otherOrderConfig/woniuOrderConfig";
import productFeature from "./modules/productFeature";
import device from "./modules/device";
import etermConfig from "./modules/etermConfig";
import owp from "./modules/owp";
import xxlJob from "./modules/xxlJob";
import firmOpenAuth from "./modules/firmOpenAuth";
import openPlatform from "./modules/openPlatform";
import jobTag from "./modules/jobTag";
import jobConfig from "./modules/jobConfig";
import jobScheduler from "./modules/jobScheduler";

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
    qunarPolicyParam,
    productMark,
    fare,
    openApiService,
    openAccount,
    tgqProduct,
    qunarOrderConfig,
    qunarOrderNotifyConfig,
    qunarPolicyConfig,
    orderStaff,
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
    productInventory,
    productProperty,
    brand,
    firmContact,
    firmAccount,
    bspConfig,
    productOrder,
    productOrderDetail,
    bspOrderConfig,
    pnrjyOrderConfig,
    woniuOrderConfig,
    productFeature,
    device,
    etermConfig,
    owp,
    xxlJob,
    firmOpenAuth,
    openPlatform,
    jobTag,
    jobConfig,
    jobScheduler
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
