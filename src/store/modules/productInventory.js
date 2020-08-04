import {getList, getOne, getPageList, removeOne, save, updateOne,addOne} from '@/api/productInventory';

const actions = {
  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      addOne(args)
        .then(dats => {
          resolve(dats);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  save({commit}, args) {
    return new Promise((resolve, reject) => {
      save(args)
        .then(dats => {
          resolve(dats);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {inventoryId, data} = args;
      updateOne(inventoryId, data)
        .then(dats => {
          resolve(dats);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {inventoryId} = args;
      removeOne(inventoryId)
        .then(dats => {
          resolve(dats);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {inventoryId} = args;
      getOne(inventoryId)
        .then(dats => {
          resolve(dats);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, args) {
    return new Promise((resolve, reject) => {
      getList(args)
        .then(dats => {
          resolve(dats);
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
        .then(dats => {
          resolve(dats);
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
