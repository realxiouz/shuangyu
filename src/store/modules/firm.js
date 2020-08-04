import {
  addOne,
  getAsyncTreeList,
  getDealerCustomerList,
  getList,
  getOne,
  getPageList,
  getRootPageList,
  getRootTotal,
  getTreeList,
  removeOne,
  saveOne,
  updateOne,
  getConfigPageList,
  getConfigList,
  getConfigOne,
  getSupplierList
} from '@/api/firm';

const actions = {
  getAsyncTreeList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pid, filter } = args;
      getAsyncTreeList(pid, filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { filter } = args;
      getList(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTreeList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { filters } = args;
      getTreeList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getDealerCustomerList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { filters } = args;
      getDealerCustomerList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRootPageList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pageFlag, pageSize, filter } = args;
      getRootPageList(pageFlag, pageSize, filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pageFlag, pageSize, ...params } = args;
      getPageList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRootTotal({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { filter } = args;
      getRootTotal(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { firmId, data } = args;
      updateOne(firmId, data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { firmId } = args;
      removeOne(firmId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { firm } = args;
      saveOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { firm } = args;
      addOne(firm)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { firmId } = args;
      getOne(firmId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getConfigPageList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pageFlag, pageSize } = args;
      getConfigPageList(pageFlag, pageSize)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getConfigList({ commit }, args) {
    return new Promise((resolve, reject) => {
      getConfigList(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getConfigOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { openId } = args;
      getConfigOne(openId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSupplierList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { filter } = args;
      getSupplierList(filter)
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
  actions
};
