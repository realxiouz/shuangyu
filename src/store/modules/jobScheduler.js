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
  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobScheduler} = args
      addOne(jobScheduler)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOneXxl({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobScheduler} = args
      addOneXxl(jobScheduler)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = args
      removeOne(jobSchedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId, jobScheduler} = args;
      updateOne(jobSchedulerId, jobScheduler)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = args;
      getOne(jobSchedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  trigger({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = args;
      trigger(jobSchedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  start({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = args;
      start(jobSchedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  stop({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobSchedulerId} = args;
      stop(jobSchedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getList(filter)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getTotal(filter)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      getPageList(args)
        .then(dada => {
          resolve(dada);
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
