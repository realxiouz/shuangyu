import { refundSearch, unLockOrder, lockOrder, getOrderTree, getList, getOne, removeOne, save, getTimeCount, getCount, getTotal, getOrderDetail, getOrderMinPrice, getOrderFlight, getFlightPrice, placeAnOrder, openPay } from "@/api/order";
import { getToken } from "@/utils/auth";


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
  save({ commit }, params) {
    return new Promise((resolve, reject) => {
      save(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({ commit }, params) {
    const { filters } = params;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({ commit }, params) {
    const { orderNo } = params;
    return new Promise((resolve, reject) => {
      removeOne(orderNo)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getTotal({ commit }, params) {
    const { filters } = params;
    return new Promise((resolve, reject) => {
      getTotal(filters)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCount({ commit }, params) {
    const { filters } = params;
    return new Promise((resolve, reject) => {
      getCount(filters)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTimeCount({ commit }, params) {
    const { filters } = params;
    return new Promise((resolve, reject) => {
      getTimeCount(filters)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({ commit }, data) {
    return new Promise((resolve, reject) => {
      getOne(data)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderDetail({ commit }, data) {
    return new Promise((resolve, reject) => {
      getOrderDetail(data)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderMinPrice({ commit }, params) {
    return new Promise((resolve, reject) => {
      getOrderMinPrice(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrderFlight({ commit }, params) {
    return new Promise((resolve, reject) => {
      getOrderFlight(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFlightPrice({ commit }, params) {
    return new Promise((resolve, reject) => {
      getFlightPrice(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛下单
  placeAnOrder({ commit }, params) {
    return new Promise((resolve, reject) => {
      placeAnOrder(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 蜗牛支付
  openPay({ commit }, params) {
    return new Promise((resolve, reject) => {
      openPay(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getOrderTree({ commit }, params) {
    return new Promise((resolve, reject) => {
      getOrderTree(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  lockOrder({ commit }, params) {
    const orderNo = params;
    return new Promise((resolve, reject) => {
      lockOrder(orderNo)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  unLockOrder({ commit }, params) {
    const orderNo = params;
    return new Promise((resolve, reject) => {
      unLockOrder(orderNo)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
// 退票查询接口
  refundSearch({ commit }, params) {
    const purchaseOrderNo = params;
    return new Promise((resolve, reject) => {
      refundSearch(purchaseOrderNo)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
