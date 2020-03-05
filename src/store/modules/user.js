import {signIn, signOut, getUser, getUserList, addUser, getList} from '@/api/user';
import {getToken, setToken, removeToken} from '@/utils/auth';

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
  signIn({commit}, userInfo) {
    const {username, password} = userInfo;
    return new Promise((resolve, reject) => {
      signIn({username: username.trim(), password: password})
        .then(response => {
          const {data} = response;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getUser({commit, state}) {
    return new Promise((resolve, reject) => {
      getUser(state.token)
        .then(response => {
          const {data} = response;

          if (!data) {
            reject('Verification failed, please Login again.');
          }

          const {name, avatar} = data;

          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  signOut({commit, state}) {
    return new Promise((resolve, reject) => {
      signOut(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          removeToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      resolve();
    });
  },

  getUserList({commit}, params) {
    return new Promise((resolve, reject) => {
      getUserList(state.token, params)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, params) {
    return new Promise((resolve, reject) => {
      getList(params)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  add({commit}, params) {
    return new Promise((resolve, reject) => {
      addUser(params)
        .then(response => {
          //const { data } = response;
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
