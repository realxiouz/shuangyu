import {
  getOne,
  save
} from '@/api/qunarOrderUpdateConfig';

const actions = {
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
  getOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {domain} = args;
      getOne(domain)
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
