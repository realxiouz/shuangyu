import { getList, getTotal } from '@/api/otherOrderConfig/woniuOrderConfig';

const actions = {
  // 获取蜗牛原始单
  getList({ commit }, params) {
    const { filters } = params;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 查询原始单数量
  getTotal({ commit }, params) {
    const { filters } = params;
    return new Promise((resolve, reject) => {
      getTotal(filters)
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
