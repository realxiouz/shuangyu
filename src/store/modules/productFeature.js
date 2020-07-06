import {saveOne, getOne, getList, getTotal, removeOne, updateOne} from '@/api/productFeature';

const actions = {
  saveOne({commit}, params) {
    return new Promise((resolve, reject) => {
      saveOne(params)
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
      const {featureId} = params;
      getOne(featureId)
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
      getList(params)
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
      const {featureId} = params;
      removeOne(featureId)
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
      updateOne(params)
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
      getTotal(params)
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
