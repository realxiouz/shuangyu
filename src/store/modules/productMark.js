import {
  addOne,
  getFirmList,
  getFlagList,
  getList,
  getListByFlagIds,
  getOne,
  getPageList,
  getTotal,
  removeOne,
  updateOne
} from "@/api/productMark";
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
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      addOne(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      updateOne(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, thirdId) {
    return new Promise((resolve, reject) => {
      removeOne(thirdId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getPageList({commit}, params) {
    const {pageFlag, pageSize, lastId, filter} = params;
    return new Promise((resolve, reject) => {
      getPageList(pageFlag, pageSize, lastId, filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      getTotal(params)
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
      getOne(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFirmList({commit}, params) {
    return new Promise((resolve, reject) => {
      getFirmList(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFlagList({commit}, params) {
    return new Promise((resolve, reject) => {
      getFlagList(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getListByFlagIds({commit}, params) {
    const {flagIds} = params;
    return new Promise((resolve, reject) => {
      getListByFlagIds(flagIds)
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
      getList(params)
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
