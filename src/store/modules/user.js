import { getVerification, signIn, signInCode, signOut, addOne, removeOne, updateOne, personalEdit, getOne, getList, getTotal, getPageList, activate, isExist, resetPassword, getVerificationCode } from "@/api/user";
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
          resolve(response);
          commit("SET_TOKEN", data.key);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 验证码登录
  signInCode({ commit }, userInfo) {
    const { username, code } = userInfo;
    return new Promise((resolve, reject) => {
      signInCode({ username: username.trim(), code: code })
        .then(response => {
          const { data } = response;
          resolve(response);
          commit("SET_TOKEN", data.key);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取用户验证码
  getVerification({ commit }, params) {
    return new Promise((resolve, reject) => {
      const { target } = params;
      getVerification(target)
        .then(response => {
          const { data } = response;
          resolve(data);
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
      const { user } = params
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
      const { userId } = params
      removeOne(userId)
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
      const { userId, data } = params;
      updateOne(userId, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  personalEdit({ commit }, params) {
    return new Promise((resolve, reject) => {
      const { userId, update, verificationCode } = params;
      personalEdit(userId, verificationCode, update)
        .then(response => {
          resolve(response.data);
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
      const { filter } = params;
      getList(filter)
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
    return new Promise((resolve, reject) => {
      const { filter } = params;
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
      const { pageFlag, pageSize, filter } = params;
      getPageList(pageFlag, pageSize, filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  activate({ commit }, params) {
    return new Promise((resolve, reject) => {
      activate(params)
        .then(response => {
          resolve(response);
          commit("SET_TOKEN", "");
          removeToken();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  isExist({ commit }, params) {
    return new Promise((resolve, reject) => {
      const { filed } = params;
      isExist(filed)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  resetPassword({ commit }, params) {
    return new Promise((resolve, reject) => {
      const { userId } = params;
      resetPassword(userId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getVerificationCode({ commit }, params) {
    return new Promise((resolve, reject) => {
      const { targetEmail } = params;
      getVerificationCode(targetEmail)
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
