import {add, deleteOne, edit, getFirmList, getTotal,getRoleInfo} from '@/api/firm';


const actions = {
  getPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      getFirmList(params)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal() {
    return new Promise((resolve, reject) => {
      getTotal()
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  edit({commit}, params) {
    return new Promise((resolve, reject) => {
      edit(params)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delete({commit}, params) {
    return new Promise((resolve, reject) => {
      deleteOne(params)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRoleInfo() {
    return new Promise((resolve, reject) => {
      getRoleInfo()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  add({commit}, params) {
    return new Promise((resolve, reject) => {
      add(params)
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
