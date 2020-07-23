import {
  getOne,
  save,
  getPageList,
  getList,
  removeOne,
  getTotal
} from '@/api/flightSegment';
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
  getOne({commit}, params) {
    const { segment } = params;
    return new Promise((resolve, reject) => {
      getOne(segment)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
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
  getPageList({commit}, args) {
    // var data = params.searchForm;
    // var searchForm = {};
    // for (var attr in data) {
    //   if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
    //     searchForm[attr] = data[attr];
    //   }
    // }
    // params.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getPageList(args)
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
    const { segment } = params;
    return new Promise((resolve, reject) => {
      removeOne(segment)
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
