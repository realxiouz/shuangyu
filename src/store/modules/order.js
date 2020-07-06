import {
  affirmRefund,
  changeApply,
  changePay,
  changeSearch,
  checkOrder,
  exportOrder,
  foPay,
  get51FlightPrice,
  getChangeHtml,
  getCount,
  getFlightPrice,
  getList,
  getMessageDetail,
  getOne,
  getOrderDetail,
  getOrderFlight,
  getOrderMinPrice,
  getOrderTree,
  getRefundHtml,
  getTimeCount,
  getTotal,
  interceptOrder,
  lockOrder,
  openPay,
  placeAnFOOrder,
  placeAnOpenOrder,
  processingChange,
  purchaseOrder,
  qunarDetailHtml,
  refundApply,
  refundCheckRefuseReason,
  refundSearch,
  rejectChange,
  removeOne,
  rewriteTicket,
  save,
  unLockOrder,
  updateBspTicketNo,
  useGoTicket,
  woniuOrder
} from "@/api/order";
import {getToken} from "@/utils/auth";


const state = {
  token: getToken(),
  name: "",
  avatar: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  save({commit}, params) {
    return new Promise((resolve, reject) => {
      save(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exportOrder({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      exportOrder(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    const {orderNo} = params;
    return new Promise((resolve, reject) => {
      removeOne(orderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getTotal({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      getTotal(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCount({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      getCount(filters)
        .then(data => {

          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTimeCount({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      getTimeCount(filters)
        .then(data => {

          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, data) {
    return new Promise((resolve, reject) => {
      getOne(data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderDetail({commit}, data) {
    return new Promise((resolve, reject) => {
      getOrderDetail(data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderMinPrice({commit}, params) {
    return new Promise((resolve, reject) => {
      getOrderMinPrice(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderFlight({commit}, params) {
    return new Promise((resolve, reject) => {
      getOrderFlight(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  get51FlightPrice({commit}, params) {
    return new Promise((resolve, reject) => {
      get51FlightPrice(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFlightPrice({commit}, params) {
    return new Promise((resolve, reject) => {
      getFlightPrice(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛下单
  placeAnOpenOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      placeAnOpenOrder(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 51下单
  placeAnFOOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      placeAnFOOrder(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 检查是否已经下单
  checkOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      checkOrder(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛支付
  openPay({commit}, params) {
    return new Promise((resolve, reject) => {
      openPay(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 51Book支付
  foPay({commit}, params) {
    return new Promise((resolve, reject) => {
      foPay(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 拦截蜗牛出票
  interceptOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      interceptOrder(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderTree({commit}, params) {
    return new Promise((resolve, reject) => {
      getOrderTree(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  lockOrder({commit}, params) {
    const orderNo = params;
    return new Promise((resolve, reject) => {
      lockOrder(orderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  unLockOrder({commit}, params) {
    const orderNo = params;
    return new Promise((resolve, reject) => {
      unLockOrder(orderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  useGoTicket({commit}, params) {
    const orderTaskId = params;
    return new Promise((resolve, reject) => {
      useGoTicket(orderTaskId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取消息明细
  getMessageDetail({commit}, params) {
    const orderNo = params;
    return new Promise((resolve, reject) => {
      getMessageDetail(orderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 退票查询接口
  refundSearch({commit}, params) {
    const purchaseOrderNo = params;
    return new Promise((resolve, reject) => {
      refundSearch(purchaseOrderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取销售退票信息
  getRefundHtml({commit}, params) {
    const orderNo = params;
    return new Promise((resolve, reject) => {
      getRefundHtml(orderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 退票申请接口
  refundApply({commit}, params) {
    return new Promise((resolve, reject) => {
      refundApply(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 确认退票信息
  affirmRefund({commit}, params) {
    return new Promise((resolve, reject) => {
      affirmRefund(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 拒绝退款
  refundCheckRefuseReason({commit}, params) {
    return new Promise((resolve, reject) => {
      refundCheckRefuseReason(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 改签查询接口
  changeSearch({commit}, params) {
    return new Promise((resolve, reject) => {
      changeSearch(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取销售改签信息
  getChangeHtml({commit}, params) {
    const purchaseOrderNo = params;
    return new Promise((resolve, reject) => {
      getChangeHtml(purchaseOrderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 改签申请接口
  changeApply({commit}, params) {
    return new Promise((resolve, reject) => {
      changeApply(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 改签支付接口
  changePay({commit}, params) {
    return new Promise((resolve, reject) => {
      changePay(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 确认改签
  processingChange({commit}, params) {
    return new Promise((resolve, reject) => {
      processingChange(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 拒绝改签
  rejectChange({commit}, params) {
    return new Promise((resolve, reject) => {
      rejectChange(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


  // 重填票号
  rewriteTicket({commit}, params) {
    return new Promise((resolve, reject) => {
      rewriteTicket(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 非蜗牛补单
  purchaseOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      purchaseOrder(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛补单
  woniuOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      woniuOrder(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  qunarDetailHtml({commit}, params) {
    return new Promise((resolve, reject) => {
      qunarDetailHtml(params.sourceOrderNo)
        .then(data => {
          resolve(data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateBspTicketNo({commit}, params) {
    return new Promise((resolve, reject) => {
      updateBspTicketNo(params)
        .then(data => {
          resolve(data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
