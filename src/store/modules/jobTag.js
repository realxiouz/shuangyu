import {
  addOne,
  getList,
  getOne,
  getPageList,
  getTotal,
  removeOne,
  updateOne
} from "@/api/jobTag";

const actions = {
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobTag} = params
      addOne(jobTag)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobTagId} = params
      removeOne(jobTagId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobTagId, jobTag} = params;
      updateOne(jobTagId, jobTag)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobTagId} = params;
      getOne(jobTagId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
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
  getTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getTotal(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, filter} = params;
      getPageList(pageFlag, pageSize, filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  actions
};
