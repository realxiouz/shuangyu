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
        .then(data => {
          resolve(data);
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
      const {merchantId, data} = params;
      updateOne(merchantId, data)
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
      const {merchantId} = params;
      getOne(merchantId)
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
  getSupplierPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, filter} = params;
      getSupplierPageList(pageFlag, pageSize, filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getCustomerPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, filter} = params;
      getCustomerPageList(pageFlag, pageSize, filter)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
  getSupplierList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getSupplierList(filter)
        .then(data => {
          resolve(data);
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
      const {firmId} = params;
      removeOne(firmId)
        .then(data => {
          resolve(data);
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
