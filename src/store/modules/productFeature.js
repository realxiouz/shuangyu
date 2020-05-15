import {  addOne, getList,getTotal,delFeatureById,editFeatureById } from '@/api/productFeature';

const actions = {
  addOne({ commit }, params) {
    return new Promise((resolve, reject) => {
      addOne(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getList(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delFeatureById({ commit }, params) {
    return new Promise((resolve, reject) => {
      delFeatureById(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
 
  editFeatureById({ commit }, params) {
    return new Promise((resolve, reject) => {
      editFeatureById(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  getTotal({ commit }, params) {
    return new Promise((resolve, reject) => {
      getTotal(params)
        .then(response => {
          const { data } = response;
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
