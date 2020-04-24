import {getList, removeOne} from '@/api/firmOther';


const actions = {
  getList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getList(filter)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  removeOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firmId} = params;
      removeOne(firmId)
        .then(response => {
          // const { data } = response;
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
