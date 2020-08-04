import {
  getOne,
  saveOne,
  getList,
  getPageList,
  removeOne
} from '@/api/voucherGroup';
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
  getOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      getOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  saveOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      saveOne(args)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getPageList({ commit }, args) {
    return new Promise((resolve, reject) => {
      getPageList(args)
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
      removeOne(args)
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
