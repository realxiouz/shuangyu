import { getList, getTotal, exportOrderNo, exportLastId, exportOrderFile } from '@/api/otherOrderConfig/qunarOrderConfig';

const actions = {

  // 查询原始单
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

  // 查询原始单数量
  getTotal({ commit }, params) {
    return new Promise((resolve, reject) => {
      getTotal(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据原始单号导单
  exportOrderNo({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportOrderNo(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据lastId增量导单
  exportLastId({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportLastId(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据文件导单
  exportOrderFile({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportOrderFile(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

}

export default {
  namespaced: true,
  actions
};
