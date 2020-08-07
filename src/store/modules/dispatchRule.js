import { save, getList, removeOne} from '@/api/dispatchRule';

const actions = {
  // getOne({commit}, args) {
  //   return new Promise((resolve, reject) => {
  //     const {deviceId} = args;
  //     getOne(deviceId)
  //       .then(data => {
  //         resolve(data);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },
  save({commit}, args) {
    return new Promise((resolve, reject) => {
      save(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, ...params} = args
      getList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {orderRuleId} = args;
      removeOne(orderRuleId)
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
