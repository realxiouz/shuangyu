import {
  start,
  stop,
  trigger
} from "@/api/xxlJob";


const actions = {
  start({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobId} = args
      start(jobId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  stop({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobId} = args
      stop(jobId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  trigger({commit}, args) {
    return new Promise((resolve, reject) => {
      const {jobId,filter} = args
      trigger(jobId,filter)
        .then(data => {
          resolve(data);
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
