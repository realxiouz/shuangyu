import {getOne, saveOne, getList, getPageList, getFirmDataList, getTotal, removeOne} from '@/api/thingsProject';

const actions = {
  getOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {projectId} = params;
      getOne(projectId)
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
  getList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {params} = args
      getList(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFirmDataList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {params} = args
      getFirmDataList(params)
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
      const {projectId} = args;
      removeOne(projectId)
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
