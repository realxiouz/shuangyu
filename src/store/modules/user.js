import {
  activation,
  addOne,
  getFirstOne,
  getList,
  getOne,
  getPageList,
  getTotal,
  getVerifyCode,
  isExist,
  removeOne,
  resetPassword,
  signIn,
  signInCode,
  signOut,
  updateOne
} from "@/api/user";
import {getToken, removeToken} from "@/utils/auth";

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
  signIn({commit}, userInfo) {
    const {username, password} = userInfo;
    return new Promise((resolve, reject) => {
      signIn({username: username.trim(), password: password})
        .then(response => {
          const {data} = response;
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
  signInCode({commit}, userInfo) {
    const {username, code} = userInfo;
    return new Promise((resolve, reject) => {
      signInCode({username: username.trim(), code: code})
        .then(response => {
          const {data} = response;
          resolve(response);
          commit("SET_TOKEN", data.key);
          resolve();
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
          commit("SET_TOKEN", "");
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
      commit("SET_TOKEN", "");
      resolve();
    });
  },

  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {user} = params
      addOne(user)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {userId} = params
      removeOne(userId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFirstOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getFirstOne(filter)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {userId, data} = params;
      updateOne(userId, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {userId} = params;
      getOne(userId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getList(filter)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, params) {
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
  getPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, filter} = params;
      getPageList(pageFlag, pageSize, filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  activation({commit}, params) {
    return new Promise((resolve, reject) => {
      activation(params)
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
  isExist({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filed} = params;
      isExist(filed)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject({code: -1, message: error.message});
        });
    });
  },
  resetPassword({commit}, params) {
    return new Promise((resolve, reject) => {
      const {userId} = params;
      resetPassword(userId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getVerifyCode({commit}, params) {
    return new Promise((resolve, reject) => {
      const {target} = params;
      getVerifyCode(target)
        .then(response => {
          const {data} = response;
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
