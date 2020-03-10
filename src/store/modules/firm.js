import {addOne, removeOne, updateOne, getPageList, getTotal, getList} from '@/api/firm';


const actions = {
  getList({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getList(filter)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, lastID, filter} = params;
      getPageList(pageFlag, pageSize, lastID, filter)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({ commit }, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getTotal(filter)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firm} = params;
      updateOne(firm)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firmID} = params;
      removeOne(firmID)
        .then(response => {
          // const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firm} = params;
      addOne(firm)
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
