import {
  getList,
  getOne,
  getOnlineList,
  getPageList,
  getTotal,
  orderStaffOffline,
  removeOne,
  save,
  setMonitor,
  staffOnline,
  updateStaffOnline
} from '@/api/orderStaff';
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
  save({commit}, data) {
    return new Promise((resolve, reject) => {
      save(data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, params) {
    var data = params.searchForm;
    var searchForm = {};
    for (var attr in data) {
      if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
        searchForm[attr] = data[attr];
      }
    }
    params.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getPageList(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    const {staffId} = params;
    return new Promise((resolve, reject) => {
      getOne(staffId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setMonitor({commit}, params) {
    const {staffId} = params;
    return new Promise((resolve, reject) => {
      setMonitor(staffId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, params) {
    var data = params.searchForm;
    var searchForm = {};
    for (var attr in data) {
      if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
        searchForm[attr] = data[attr];
      }
    }
    params.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getList(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOnlineList({commit}, params) {
    var data = params.searchForm;
    var searchForm = {};
    for (var attr in data) {
      if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
        searchForm[attr] = data[attr];
      }
    }
    params.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getOnlineList(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  staffOnline({commit}, params) {
    return new Promise((resolve, reject) => {
      staffOnline(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateStaffOnline({commit}, params) {
    return new Promise((resolve, reject) => {
      updateStaffOnline(params)
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
      getTotal(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    const {staffId} = params;
    return new Promise((resolve, reject) => {
      removeOne(staffId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 强制下线
  orderStaffOffline({commit}, params) {
    const {staffId} = params;
    return new Promise((resolve, reject) => {
      orderStaffOffline(staffId)
        .then(response => {
          resolve(response);
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
