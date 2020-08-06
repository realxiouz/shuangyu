import {addOne,updateOne,removeOne,getOne,getList,getTotal,getPageList} from '@/api/bspConfig';

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
  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      updateOne(args)
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
      const {configId} = args;
      removeOne(configId)
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
      getOne(args)
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
      const {pageFlag, pageSize, lastId, filter} = args;
      getPageList(pageFlag, pageSize, lastId, filter)
        .then(data => {
          resolve(data);
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
