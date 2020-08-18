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
  updateOne,
  getPurchaseList,
  getSellList
} from '@/api/productOrder';
import { resolve, reject } from 'core-js/fn/promise';

const actions = {
  saveOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      saveOrder(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  inWarehouseOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      const {orderNo, data} = args;
      inWarehouseOrder(orderNo, data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  outWarehouseOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      const {orderNo, data} = args;
      outWarehouseOrder(orderNo, data)
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
      const {orderNo} = args;
      removeOne(orderNo)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  confirmOrder({commit}, args) {
    return new Promise((resolve, reject) => {
      confirmOrder(args)
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
      const {orderNo} = args;
      getOne(orderNo)
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

  getSellList(_ , args) {
    return new Promise((resolve, reject) => {
      const { rootOrderNo } = args
      getSellList(rootOrderNo).then(data => [
        resolve(data)
      ]).catch(error => {
        reject(error)
      })
    })
  },
  getPurchaseList(_ , args) {
    return new Promise((resolve, reject) => {
      const { rootOrderNo } = args
      getPurchaseList(rootOrderNo).then(data => [
        resolve(data)
      ]).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  actions
};
