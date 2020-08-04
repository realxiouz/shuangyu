import {
  addOne,
  associateUser,
  getCustomerList,
  getCustomerPageList,
  getCustomerTotal,
  getList,
  getOne,
  getPageList,
  getSupplierList,
  getSupplierPageList,
  getSupplierTotal,
  getTotal,
  removeOne,
  updateOne
} from '@/api/firmMerchant';


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
  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {merchantId, data} = args;
      updateOne(merchantId, data)
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
      const {merchantId} = args;
      getOne(merchantId)
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
      const {pageFlag, pageSize, ...params} = args;
      getPageList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSupplierPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, ...params} = args;
      getSupplierPageList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCustomerPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, ...params} = args;
      getCustomerPageList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCustomerTotal({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getCustomerTotal(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSupplierTotal({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getSupplierTotal(filter)
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
  getSupplierList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getSupplierList(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCustomerList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getCustomerList(filter)
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
      const {merchantId} = args;
      removeOne(merchantId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  associateUser({commit}, args) {
    const {staffId, userId} = args;
    return new Promise((resolve, reject) => {
      associateUser(staffId, userId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
}

export default {
  namespaced: true,
  actions
};
