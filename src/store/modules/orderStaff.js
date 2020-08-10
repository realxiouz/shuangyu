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
  save({commit}, args) {
    return new Promise((resolve, reject) => {
      save(args)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, args) {
    const {staffId} = args;
    return new Promise((resolve, reject) => {
      getOne(staffId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setMonitor({commit}, args) {
    const {staffId} = args;
    return new Promise((resolve, reject) => {
      setMonitor(staffId)
        .then(data => {
          resolve(data);
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOnlineList({commit}, args) {
    var data = args.searchForm;
    var searchForm = {};
    for (var attr in data) {
      if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
        searchForm[attr] = data[attr];
      }
    }
    args.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getOnlineList(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  staffOnline({commit}, args) {
    return new Promise((resolve, reject) => {
      staffOnline(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateStaffOnline({commit}, args) {
    return new Promise((resolve, reject) => {
      updateStaffOnline(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, args) {
    return new Promise((resolve, reject) => {
      getTotal(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    const {staffId} = args;
    return new Promise((resolve, reject) => {
      removeOne(staffId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 强制下线
  orderStaffOffline({commit}, args) {
    const {staffId} = args;
    return new Promise((resolve, reject) => {
      orderStaffOffline(staffId)
        .then(data => {
          resolve(data);
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
