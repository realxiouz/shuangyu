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
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {merchantId, data} = params;
      updateOne(merchantId, data)
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
      const {merchantId} = params;
      getOne(merchantId)
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
  getSupplierPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      getSupplierPageList(args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCustomerPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      getCustomerPageList(args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCustomerTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getCustomerTotal(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSupplierTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getSupplierTotal(filter)
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
          resolve(response);
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
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCustomerList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getCustomerList(filter)
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
      const {merchantId} = params;
      removeOne(merchantId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  associateUser({commit}, params) {
    const {staffId, userId} = params;
    return new Promise((resolve, reject) => {
      associateUser(staffId, userId)
        .then(response => {
          resolve(response);
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
