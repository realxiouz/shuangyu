import { save, removeOne, online, offline, getList } from "@/api/etermConfig";

const actions = {
  save({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { etermConfig } = args
      save(etermConfig)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { id } = args
      removeOne(id)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  online({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { id } = args
      online(id)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  offline({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { id } = args
      offline(id)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { filter } = args;
      getList(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  actions
};
