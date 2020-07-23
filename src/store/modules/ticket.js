import { getList, getTotal, getCount } from '@/api/ticket';

const state = {
    info: {},
    passengers: [],
    orderDetails: [],
    parentNo: ''
};

const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
  setPassengers(state, passengers){
    state.passengers = passengers;
  },
  setOrderDetails(state, orderDetails) {
    state.orderDetails = orderDetails
  },
  setParentNo(state, no) {
    state.parentNo = no
  } 
};

const actions = {
  getList({ commit }, params) {
    const { filters } = params;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(response => {
          resolve(response);
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
          resolve(response);
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
          resolve(response);
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
