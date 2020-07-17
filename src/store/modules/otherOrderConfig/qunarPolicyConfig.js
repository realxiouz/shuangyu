import {
  saveOne,
  addOne,
  updateOne,
  getOne,
  getList,
  getPageList,
  removeOne
} from '@/api/otherOrderConfig/qunarPolicyConfig';

const actions = {
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      addOne(args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  updateOne({commit}, args) {
    const {policyConfigId} = args;
    return new Promise((resolve, reject) => {
      updateOne(policyConfigId, args)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getOne({commit}, params) {
    const {policyConfigId} = params;
    return new Promise((resolve, reject) => {
      getOne(policyConfigId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filters} = params;
      getList(filters)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
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
  },
  // eslint-disable-next-line no-unused-vars
  removeOne({commit}, args) {
    const {policyConfigId} = args;
    return new Promise((resolve, reject) => {
      removeOne(policyConfigId)
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
