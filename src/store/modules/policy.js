import {getList, getOne, removeOne, save, updateOne} from "@/api/policy";

const actions = {
  save({commit}, params) {
    return new Promise((resolve, reject) => {
      save(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    const {user, domain} = params;
    return new Promise((resolve, reject) => {
      removeOne(user, domain)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    const {user, domain} = params;
    return new Promise((resolve, reject) => {
      getOne(user, domain)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      updateOne(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

};

export default {
  namespaced: true,
  actions
};
