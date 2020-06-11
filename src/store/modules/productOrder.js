import {
  confirmOrder,
  getList,
  getOne,
  getPageList,
  getTotal,
  inWarehouseOrder,
  outWarehouseOrder,
  removeOne,
  saveOrder,
  updateOne
} from '@/api/productOrder';

const actions = {
  saveOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      saveOrder(params)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  inWarehouseOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      const {orderNo, data} = params;
      inWarehouseOrder(orderNo, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  outWarehouseOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      const {orderNo, data} = params;
      outWarehouseOrder(orderNo, data)
        .then(response => {
          resolve(response.data);
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
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {orderNo} = params;
      removeOne(orderNo)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  confirmOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      confirmOrder(params)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {orderNo} = params;
      getOne(orderNo)
        .then(response => {
          resolve(response.data);
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
          resolve(response.data);
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
          resolve(response.data);
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
        .then(response => {
          resolve(response.data);
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
