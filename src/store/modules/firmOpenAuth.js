import {
  getOne,
  addOne,
  updateOne,
  getList,
  getPageList,
  getCustomerList,
  getSupplierList,
  removeOne
} from '@/api/firmOpenAuth';
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
  // eslint-disable-next-line no-unused-vars
  getOne({ commit }, params) {
    return new Promise((resolve, reject) => {
      const { authId } = params;
      getOne(authId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  addOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      addOne(args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  updateOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { authId } = args;
      updateOne(authId, args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getList({ commit }, args) {
    return new Promise((resolve, reject) => {
      getList(args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getPageList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pageFlag, pageSize, params } = args;
      getPageList(pageFlag, pageSize, params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getCustomerList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getCustomerList(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getSupplierList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getSupplierList(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  removeOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { authId } = args;
      removeOne(authId)
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
