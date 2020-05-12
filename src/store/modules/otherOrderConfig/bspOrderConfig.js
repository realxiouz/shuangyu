import { getList, getTotal, exportOrder } from '@/api/otherOrderConfig/bspOrderConfig';

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
  exportOrder({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportOrder(params)
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
