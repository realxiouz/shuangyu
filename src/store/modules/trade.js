import {
  getList,
  getOne,
  getPageList,
  removeOne,
  save,
  update
} from "@/api/trade";
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
  getList({commit}, params) {
    const {filters} = params;
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
  // eslint-disable-next-line no-unused-vars
  getOne({commit}, params) {
    const {tradeId} = params;
    return new Promise((resolve, reject) => {
      getOne(tradeId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getPageList({commit}, params) {
    const {pageFlag, pageSize, filter} = params;
    return new Promise((resolve, reject) => {
      getPageList(pageFlag, pageSize, filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  removeOne({commit}, params) {
    const {tradeId} = params;
    return new Promise((resolve, reject) => {
      removeOne(tradeId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  save({commit}, params) {
    return new Promise((resolve, reject) => {
      save(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  update({commit}, params) {
    return new Promise((resolve, reject) => {
      const {tradeId} = params;
      update(tradeId, params)
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
