import {getList, getOne, getPageList, getTotal, removeOne, save, updateOne} from '@/api/product';

const actions = {
  save({commit}, params) {
    return new Promise((resolve, reject) => {
      save(params)
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
      const {productId, data} = params;
      updateOne(productId, data)
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
      const {productId} = params;
      removeOne(productId)
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
      const {productId} = params;
      getOne(productId)
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
  getPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, filter} = params;
      getPageList(pageFlag, pageSize, filter)
        .then(response => {
          resolve(response);
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
