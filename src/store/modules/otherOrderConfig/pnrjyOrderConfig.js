import { save } from '@/api/otherOrderConfig/pnrjyOrderConfig';

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

}

export default {
  namespaced: true,
  actions
};
