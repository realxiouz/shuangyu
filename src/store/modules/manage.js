import {notify} from '@/api/manage';

const actions = {
  notify({commit}, args) {
    return new Promise((resolve, reject) => {
      notify(args)
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
