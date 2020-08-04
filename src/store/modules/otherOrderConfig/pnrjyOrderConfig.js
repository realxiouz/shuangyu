import {
  getList,
  getTotal,
  exportOrder
} from '@/api/otherOrderConfig/pnrjyOrderConfig';

const actions = {
  // 查询原始单
  getList({ commit }, args) {
    const {filters} = args;
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
    const {filters} = args;
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

  //导单 
  exportOrder({ commit }, args) {
    // const {orderType, file} = args;
    return new Promise((resolve, reject) => {
      exportOrder(args)
        .then(data => {
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
