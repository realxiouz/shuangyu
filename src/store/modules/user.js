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
  token: getToken(),
  name: "",
  avatar: "",
  routes: [],
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
  },

  setRoutes(state, routes) {
    state.routes = routes
  }
};

const actions = {
  signIn({commit}, args) {
    const {username, password} = args;
    return new Promise((resolve, reject) => {
      signIn({username: username.trim(), password: password})
        .then(response => {
          resolve(response);
          commit("SET_TOKEN", response.token);
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
        .then(response => {
          resolve(response);
          commit("SET_TOKEN", response.token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  signOut({commit, args}) {
    return new Promise((resolve, reject) => {
      const {token} = args;
      signOut(token)
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

  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {user} = args
      addOne(user)
        .then(response => {
          resolve(response);
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
        .then(response => {
          resolve(response);
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
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {id, data} = args;
      updateOne(id, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveOne({commit}, args) {
    return new Promise((resolve, reject) => {
      saveOne(args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {id} = args;
      getOne(id)
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
      const {filter} = args;
      getList(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      getPageList(args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  activation({commit}, args) {
    return new Promise((resolve, reject) => {
      activation(args)
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
  isExist({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filed} = args;
      isExist(filed)
        .then(response => {
          resolve(response);
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
        .then(response => {
          resolve(response);
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
