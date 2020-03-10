import { signIn, signOut, addOne, removeOne, updateOne, getOne, getList, getTotal, getPageList } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";

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
  signIn({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      signIn({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /*getUser({commit, state}) {
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
  },*/

  signOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      signOut(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      resolve();
    });
  },

  addOne({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {user} = params;
      addOne(user)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {userID} = params
      removeOne(userID)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {user} = params;
      updateOne(user)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({ commit }, params) {
    return new Promise((resolve, reject) => {
      const { userId } = params;
      getOne(userId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getList(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getTotal(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, lastID, filter} = params;
      getPageList(pageFlag, pageSize, lastID, filter)
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
