import {
  addOne,
  getList,
  getOne,
  getPageList,
  getTotal,
  removeOne,
  updateOne,
  addOneXxl,
  trigger,
  start,
  stop,
} from "@/api/jobScheduler";

const actions = {
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobScheduler} = params
      addOne(jobScheduler)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOneXxl({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobScheduler} = params
      addOneXxl(jobScheduler)
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
      const {jobSchedulerId} = params
      removeOne(jobSchedulerId)
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
      const {jobSchedulerId, jobScheduler} = params;
      updateOne(jobSchedulerId, jobScheduler)
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
      const {jobSchedulerId} = params;
      getOne(jobSchedulerId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  trigger({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = params;
      trigger(jobSchedulerId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  start({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = params;
      start(jobSchedulerId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  stop({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = params;
      stop(jobSchedulerId)
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
  getPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      const { pageFlag, pageSize, params } = args;
      getPageList(pageFlag, pageSize, params)
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
