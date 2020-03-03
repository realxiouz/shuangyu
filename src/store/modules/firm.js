import {addOne, removeOne, updateOne, getPageList, getTotal, getList} from '@/api/firm';


const actions = {
  getList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getList(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getPageList(params)
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
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      updateOne(params)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    return new Promise((resolve, reject) => {
      removeOne(params)
        .then(response => {
          // const { data } = response;
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
  }
}

export default {
  namespaced: true,
  actions
};
