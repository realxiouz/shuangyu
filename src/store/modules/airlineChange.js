import {
  addOne,
  saveOne,
  getOne,
  getList,
  removeOne
} from '@/api/airlineChange';
import {getToken} from '@/utils/auth';

const state = {
  token: getToken(),
  name: '',
  avatar: ''
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
  addOne({commit}, data) {
    return new Promise((resolve, reject) => {
      addOne(data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveOne({commit}, data) {
    return new Promise((resolve, reject) => {
      saveOne(data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    const { airline } = params;
    return new Promise((resolve, reject) => {
      getOne(airline)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, args) {
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
  removeOne({commit}, params) {
    const { airline } = params;
    return new Promise((resolve, reject) => {
      removeOne(airline)
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
