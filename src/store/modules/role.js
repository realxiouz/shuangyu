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
      const {roleId, data} = params;
      updateOne(roleId, data)
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
      const {roleId} = params;
      getOne(roleId)
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
  getUserRole({commit}, params) {
    return new Promise((resolve, reject) => {
      const {flog} = params;
      getUserRole(flog)
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
  getPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      getPageList(args)
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
