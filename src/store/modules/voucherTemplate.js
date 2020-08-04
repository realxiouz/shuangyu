import {
  getOne,
  saveData,
  getPageList,
  removeOne
} from '@/api/voucherTemplate';

const actions = {
  // eslint-disable-next-line no-unused-vars
  getOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      getOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  saveData({ commit }, args) {
    return new Promise((resolve, reject) => {
      saveData(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getPageList({ commit }, args) {
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
  // eslint-disable-next-line no-unused-vars
  removeOne({ commit }, args) {
    return new Promise((resolve, reject) => {
      removeOne(args)
        .then(data => {
          resolve(data);
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
