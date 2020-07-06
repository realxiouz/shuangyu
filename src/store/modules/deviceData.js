import {getOne, saveOne, getPageList, getTotal, removeOne} from '@/api/deviceData';

const actions = {
  getOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {dataId} = params;
      getOne(dataId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveOne({commit}, args) {
    return new Promise((resolve, reject) => {
      saveOne(args)
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
      const {pageFlag, pageSize, params} = args
      getPageList(pageFlag, pageSize, params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {dataId} = args;
      removeOne(dataId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getTotal({commit}) {
    return new Promise((resolve, reject) => {
      getTotal()
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
