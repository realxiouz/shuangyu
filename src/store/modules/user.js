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
        .then(data => {
          resolve(data);
          commit("SET_TOKEN", data.token);
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
        .then(data => {
          resolve(data);
          commit("SET_TOKEN", data.token);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // getTotal({commit}, params) {
  //   return new Promise((resolve, reject) => {
  //     const {filter} = params;
  //     getTotal(filter)
  //       .then(data => {
  //         resolve(data);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },
  getPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, filter} = params;
      getPageList(pageFlag, pageSize, filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  activation({commit}, params) {
    return new Promise((resolve, reject) => {
      activation(params)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
