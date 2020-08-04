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
  save({commit}, args) {
    return new Promise((resolve, reject) => {
      save(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, args) {
    return new Promise((resolve, reject) => {
      getList(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exportOrder({commit}, args) {
    const {filters} = args;
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
  removeOne({commit}, args) {
    const {orderNo} = args;
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

  getTotal({commit}, args) {
    const {filters} = args;
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
  getCount({commit}, args) {
    const {filters} = args;
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
  getTimeCount({commit}, args) {
    const {filters} = args;
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
  getOrderMinPrice({commit}, args) {
    return new Promise((resolve, reject) => {
      getOrderMinPrice(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderFlight({commit}, args) {
    return new Promise((resolve, reject) => {
      getOrderFlight(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  get51FlightPrice({commit}, args) {
    return new Promise((resolve, reject) => {
      get51FlightPrice(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFlightPrice({commit}, args) {
    return new Promise((resolve, reject) => {
      getFlightPrice(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛下单
  placeAnOpenOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      placeAnOpenOrder(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 51下单
  placeAnFOOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      placeAnFOOrder(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 检查是否已经下单
  checkOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      checkOrder(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛支付
  openPay({commit}, args) {
    return new Promise((resolve, reject) => {
      openPay(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 51Book支付
  foPay({commit}, args) {
    return new Promise((resolve, reject) => {
      foPay(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 拦截蜗牛出票
  interceptOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      interceptOrder(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderTree({commit}, args) {
    return new Promise((resolve, reject) => {
      getOrderTree(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  lockOrder({commit}, args) {
    const orderNo = args;
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

  unLockOrder({commit}, args) {
    const orderNo = args;
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

  useGoTicket({commit}, args) {
    const orderTaskId = args;
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
  getMessageDetail({commit}, args) {
    const orderNo = args;
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
  refundSearch({commit}, args) {
    const purchaseOrderNo = args;
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
  getRefundHtml({commit}, args) {
    const orderNo = args;
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
  refundApply({commit}, args) {
    return new Promise((resolve, reject) => {
      refundApply(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 确认退票信息
  affirmRefund({commit}, args) {
    return new Promise((resolve, reject) => {
      affirmRefund(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 拒绝退款
  refundCheckRefuseReason({commit}, args) {
    return new Promise((resolve, reject) => {
      refundCheckRefuseReason(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 改签查询接口
  changeSearch({commit}, args) {
    return new Promise((resolve, reject) => {
      changeSearch(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取销售改签信息
  getChangeHtml({commit}, args) {
    const purchaseOrderNo = args;
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
  changeApply({commit}, args) {
    return new Promise((resolve, reject) => {
      changeApply(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 改签支付接口
  changePay({commit}, args) {
    return new Promise((resolve, reject) => {
      changePay(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 确认改签
  processingChange({commit}, args) {
    return new Promise((resolve, reject) => {
      processingChange(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 拒绝改签
  rejectChange({commit}, args) {
    return new Promise((resolve, reject) => {
      rejectChange(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


  // 重填票号
  rewriteTicket({commit}, args) {
    return new Promise((resolve, reject) => {
      rewriteTicket(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 非蜗牛补单
  purchaseOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      purchaseOrder(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛补单
  woniuOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      woniuOrder(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  qunarDetailHtml({commit}, args) {
    return new Promise((resolve, reject) => {
      qunarDetailHtml(args.sourceOrderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateBspTicketNo({commit}, args) {
    return new Promise((resolve, reject) => {
      updateBspTicketNo(args)
        .then(data => {
          resolve(data);
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
