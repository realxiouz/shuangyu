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
  getConfigTotal,
  getSupplierList
} from '@/api/firm';


const actions = {
  getAsyncTreeList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pid, filter} = params;
      getAsyncTreeList(pid, filter)
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
  getTreeList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filters} = params;
      getTreeList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getDealerCustomerList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filters} = params;
      getDealerCustomerList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRootPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, filter} = params;
      getRootPageList(pageFlag, pageSize, filter)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRootTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getRootTotal(filter)
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
      const {id, data} = params;
      updateOne(id, data)
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
      const {firmID} = params;
      removeOne(firmID)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firm} = params;
      saveOne(firm)
        .then(data => {
          
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firm} = params;
      addOne(firm)
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
      const {firmId} = params;
      getOne(firmId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getConfigPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      getConfigPageList(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getConfigTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getConfigTotal(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSupplierList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getSupplierList(filter)
        .then(response => {
          const {data} = response;
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
  actions
};
