import {
  activation,
  addOne,
  getFirstOne,
  getList,
  getOne,
  getPageList,
  getVerifyCode,
  isExist,
  removeOne,
  resetPassword,
  signIn,
  signInCode,
  signOut,
  updateOne,
  saveOne
} from "@/api/user";
import {getToken, removeToken} from "@/utils/auth";

const state = {
  token: getToken()
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

const actions = {
  signIn({commit}, args) {
    const {username, password} = args;
    return new Promise((resolve, reject) => {
      signIn({username: username.trim(), password: password})
        .then(data => {
          resolve(data);
          commit("setToken", data.token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 验证码登录
  signInCode({commit}, args) {
    const {username, code} = args;
    return new Promise((resolve, reject) => {
      signInCode({username: username.trim(), code: code})
        .then(data => {
          resolve(data);
          commit("setToken", data.token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  signOut({commit}, args) {
    return new Promise((resolve, reject) => {
      // const {token} = args;
      signOut(args)
        .then(() => {
          commit("setToken", "");
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
      commit("setToken", "");
      resolve();
    });
  },

  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {user} = args
      addOne(user)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {userId} = args
      removeOne(userId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFirstOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getFirstOne(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      updateOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveOne({commit}, args) {
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
  getOne({commit}, args) {
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
  getList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getList(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, args) {
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
  activation({commit}, args) {
    return new Promise((resolve, reject) => {
      activation(args)
        .then(data => {
          resolve(data);
          commit("setToken", "");
          removeToken();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  isExist({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filed} = args;
      isExist(filed)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject({code: -1, message: error.message});
        });
    });
  },
  resetPassword({commit}, args) {
    return new Promise((resolve, reject) => {
      const {id} = args;
      resetPassword(id)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getVerifyCode({commit}, args) {
    return new Promise((resolve, reject) => {
      const {target} = args;
      getVerifyCode(target)
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
