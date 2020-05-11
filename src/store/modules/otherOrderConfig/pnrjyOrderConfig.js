import {
  save,
  exportOrder
} from '@/api/otherOrderConfig/pnrjyOrderConfig';

const actions = {
  save({ commit }, params) {
    return new Promise((resolve, reject) => {
      save(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exportOrder({ commit }, params) {
    // const {orderType, file} = params;
    return new Promise((resolve, reject) => {
      exportOrder(params)
        .then(response => {
          //const { data } = response;
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
