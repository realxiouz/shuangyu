import {orderNonexist} from '@/api/qunarOrderController';

const actions = {
  orderNonexist({commit}, params) {
    return new Promise((resolve, reject) => {
      orderNonexist(params)
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
