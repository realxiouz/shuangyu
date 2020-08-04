import {
  addMany,
  addOne,
  associateUser,
  getList,
  getMany,
  getOne,
  getPageList,
  getTotal,
  isExist,
  relationUser,
  removeOne,
  updateOne,
  getLoginInfo
} from "@/api/staff";

const state = {
  loginInfo: {}
};

const mutations = {
  setLoginInfo: (state, data) => {
    state.loginInfo = data;
  }
};

const actions = {
  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      addOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addMany({commit}, args) {
    return new Promise((resolve, reject) => {
      addMany(args)
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
      const {id, data} = args;
      updateOne(id, data)
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
      const {staffId} = args;
      removeOne(staffId)
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
      const {staffId} = args;
      getOne(staffId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getTotal(filter)
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
  relationUser({commit}, args) {
    return new Promise((resolve, reject) => {
      const {staffId, userId} = args;
      relationUser(staffId, userId)
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
      const {pageFlag, pageSize, lastId, filter} = args;
      getPageList(pageFlag, pageSize, lastId, filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /*filter为对用户进行查询所需的条件*/
  associateUser({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      associateUser(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMany({commit}, args) {
    return new Promise((resolve, reject) => {
      //const {staffIdList} = args;
      getMany(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  isExist({commit}, args) {
    return new Promise((resolve, reject) => {
      isExist(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getLoginInfo({commit}, args) {
    return new Promise((resolve, reject) => {
      const {firmId} = args;
      getLoginInfo(firmId)
        .then(data => {
          console.log(data);
          commit("setLoginInfo", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
