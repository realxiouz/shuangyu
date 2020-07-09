import {notify} from '@/api/manage';

const actions = {
  notify({commit}, params) {
    return new Promise((resolve, reject) => {
      notify(params)
        .then(response => {
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
