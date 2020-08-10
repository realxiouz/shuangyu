import {getCount, getList, getOne, getTotal, removeOne, save} from "@/api/orderReport";
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
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
