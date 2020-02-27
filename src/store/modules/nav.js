import {remove, addNav, update, getOneNav, getNavList} from '@/api/nav';

const actions = {
  delete({commit}, Id) {
    return new Promise((resolve, reject) => {
      remove (Id)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  add({commit}, params) {
    return new Promise((resolve, reject) => {
      addNav(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  update({commit}, params) {
    return new Promise((resolve, reject) => {
      update(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, Id) {
    return new Promise((resolve, reject) => {
      getOneNav(Id)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getNavList({commit}, params) {
    return new Promise((resolve, reject) => {
      getNavList(params)
        .then(response => {
          const {data} = response;
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
