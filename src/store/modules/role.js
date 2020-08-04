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
  saveOne({commit}, args) {
    return new Promise((resolve, reject) => {
      saveOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
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
  addMany({commit}, args) {
    return new Promise((resolve, reject) => {
      addMany(args)
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
      const {roleId, data} = args;
      updateOne(roleId, data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateMany({commit}, args) {
    return new Promise((resolve, reject) => {
      const {id, data} = args;
      updateMany(id, data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateManyByFilter({commit}, args) {
    return new Promise((resolve, reject) => {
      const {id, data} = args;
      updateManyByFilter(id, data)
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
      removeOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeMany({commit}, args) {
    return new Promise((resolve, reject) => {
      const {ids} = args;
      removeMany(ids)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeManyByFilter({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      removeManyByFilter(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeRealOne({commit}, args) {
    return new Promise((resolve, reject) => {
      removeRealOne(args)
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
      const {roleId} = args;
      getOne(roleId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOneByFilter({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getOneByFilter(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMany({commit}, args) {
    return new Promise((resolve, reject) => {
      const {ids} = args;
      getMany(ids)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUserRole({commit}, args) {
    return new Promise((resolve, reject) => {
      const {flog} = args;
      getUserRole(flog)
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
      getPageList(args)
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
  }
}

export default {
  namespaced: true,
  actions
};
