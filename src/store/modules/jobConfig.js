import {
  addOne,
  getList,
  getOne,
  getPageList,
  getTotal,
  removeOne,
  updateOne
} from "@/api/jobConfig";

const actions = {
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobConfig} = params
      addOne(jobConfig)
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
      const {jobConfigId} = params
      removeOne(jobConfigId)
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
      const {jobConfigId, jobConfig} = params;
      updateOne(jobConfigId, jobConfig)
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
      const {jobConfigId} = params;
      getOne(jobConfigId)
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
          resolve(response);
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
