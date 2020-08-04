import {orderNonexist} from '@/api/qunarOrderController';

const actions = {
  orderNonexist({commit}, args) {
    return new Promise((resolve, reject) => {
      orderNonexist(args)
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
