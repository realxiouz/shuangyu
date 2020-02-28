import { removeApp, updApp, getAppList, getAppTotal, saveOrUpd } from "@/api/app";
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
  updApp({ commit }, params) {
    return new Promise((resolve, reject) => {
      updApp(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveOrUpd({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveOrUpd(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeApp({ commit }, data) {
    return new Promise((resolve, reject) => {
      removeApp(data)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAppList({ commit }, params) {
    const { pageFlag, pageSize, lastId, filter } = params;
    return new Promise((resolve, reject) => {
      getAppList(pageFlag, pageSize, lastId, filter)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getAppTotal({ commit }, params) {
    return new Promise((resolve, reject) => {
      getAppTotal(params)
        .then(response => {
          const { data } = response;
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
