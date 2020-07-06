import {saveOne, addOne, addMany, updateOne, updateMany, updateManyByFilter, removeOne, removeMany, removeManyByFilter, removeRealOne, getOne, getOneByFilter, getMany, getList, getPageList, getTotal} from '@/api/api';

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
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      addOne(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addMany({commit}, params) {
    return new Promise((resolve, reject) => {
      addMany(params)
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
      const {apiId, data} = params;
      updateOne(apiId, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateMany({commit}, params) {
    return new Promise((resolve, reject) => {
      const {id, data} = params;
      updateMany(id, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateManyByFilter({commit}, params) {
    return new Promise((resolve, reject) => {
      const {id, data} = params;
      updateManyByFilter(id, data)
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
      const {id} = params;
      removeOne(id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeMany({commit}, params) {
    return new Promise((resolve, reject) => {
      const {ids} = params;
      removeMany(ids)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeManyByFilter({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      removeManyByFilter(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeRealOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {id} = params;
      removeRealOne(id)
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
      const {id} = params;
      getOne(id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOneByFilter({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getOneByFilter(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMany({commit}, params) {
    return new Promise((resolve, reject) => {
      const {ids} = params;
      getMany(ids)
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
  }
}

export default {
  namespaced: true,
  actions
};
