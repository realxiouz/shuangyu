import { getList, getTotal,getFlight ,getPrice} from '@/api/otherOrderConfig/woniuOrderConfig';

const actions = {
  // 获取蜗牛原始单
  getList({ commit }, args) {
    const { filters } = args;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 查询原始单数量
  getTotal({ commit }, args) {
    const { filters } = args;
    return new Promise((resolve, reject) => {
      getTotal(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getFlight({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getFlight(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getPrice({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getPrice(filter)
        .then(data => {
          resolve(data);
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
