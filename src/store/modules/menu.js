import {saveOne, addOne, addMany, updateOne, updateMany, updateManyByFilter, removeOne, removeMany, removeManyByFilter, removeRealOne, getOne, getOneByFilter, getMany, getList, getTreeList, getPageList, nodeDragDrop} from '@/api/menu/';

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
      const {id, data} = args;
      updateOne(id, data)
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
      const {id} = args;
      removeOne(id)
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
      const {id} = args;
      removeRealOne(id)
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
      const {id} = args;
      getOne(id)
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
  getTreeList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getTreeList(filter)
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
      const {pageFlag, pageSize, filter} = args;
      getPageList(pageFlag, pageSize, filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  nodeDragDrop({commit}, args) {
    return new Promise((resolve, reject) => {
      nodeDragDrop(args)
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
