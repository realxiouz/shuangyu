import {
  addMany,
  addOne,
  getList,
  getMany,
  getOne,
  getOneByFilter,
  getPageList,
  getTotal,
  getUserRole,
  removeMany,
  removeManyByFilter,
  removeOne,
  removeRealOne,
  saveOne,
  updateMany,
  updateManyByFilter,
  updateOne
} from '@/api/role';

const actions = {
  saveOne({commit}, params) {
    return new Promise((resolve, reject) => {
      saveOne(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      addOne(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addMany({commit}, params) {
    return new Promise((resolve, reject) => {
      addMany(params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {roleId, data} = params;
      updateOne(roleId, data)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUserRole({commit}, params) {
    return new Promise((resolve, reject) => {
      const {flog} = params;
      getUserRole(flog)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
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
