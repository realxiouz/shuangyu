import { getList } from '@/api/otherOrderConfig/qunarOrderConfig';

const actions = {
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

}

export default {
  namespaced: true,
  actions
};
