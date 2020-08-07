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
  updateMany,
  getLoginInfo
} from "@/api/staff";

function treeSort(arry) {
  if (arry && arry.length > 0) {
    arry.forEach(i => {
      if (i.children && i.children.length > 0) {
        treeSort(i.children);
      }
    });
    arry.sort((i, j) => i.sort - j.sort);
  }
}

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
  updateMany({commit}, args) {
    const { ids, data } = args;
    return new Promise((resolve, reject) => {
      updateMany(ids, data)
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
          treeSort(data.menus)
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
