import {
  start,
  stop,
  trigger
} from "@/api/xxlJob";


const actions = {
  start({commit}, params) {
    return new Promise((resolve, reject) => {
      const {jobId} = params
      start(jobId)
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
      const {jobId} = params
      stop(jobId)
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
      const {jobId,filter} = params
      trigger(jobId,filter)
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
