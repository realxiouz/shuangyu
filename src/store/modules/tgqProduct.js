import {
  getOne,
  save,
  getPageList,
  getList,
  getParamList,
  removeOne,
  getTotal,
  saveAndStart,
  start,
  stop
} from '@/api/tgqProduct';
import {getToken} from '@/utils/auth';

const state = {
  token: getToken(),
  name: '',
  avatar: ''
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  save({commit}, args) {
    return new Promise((resolve, reject) => {
      save(args)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveAndStart({commit}, args) {
    return new Promise((resolve, reject) => {
      saveAndStart(args)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, args) {
    var data = args.searchForm;
    var searchForm = {};
    for (var attr in data) {
      if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
        searchForm[attr] = data[attr];
      }
    }
    args.searchForm = searchForm;
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
  getOne({commit}, args) {
    const { schedulerId } = args;
    return new Promise((resolve, reject) => {
      getOne(schedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  start({commit}, args) {
    const { schedulerId } = args;
    return new Promise((resolve, reject) => {
      start(schedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  stop({commit}, args) {
    const { schedulerId } = args;
    return new Promise((resolve, reject) => {
      stop(schedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, args) {
    var data = args.searchForm;
    var searchForm = {};
    for (var attr in data) {
      if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
        searchForm[attr] = data[attr];
      }
    }
    args.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getList(args)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getParamList({commit}, args) {
    var data = args.searchForm;
    var searchForm = {};
    for (var attr in data) {
      if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
        searchForm[attr] = data[attr];
      }
    }
    args.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getParamList(args)
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
      getTotal(args)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    const { schedulerId } = args;
    return new Promise((resolve, reject) => {
      removeOne(schedulerId)
        .then(dada => {
          resolve(dada);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
