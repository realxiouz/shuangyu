import {
  getOne,
  save,
  getPageList,
  getList,
  removeOne,
  getTotal
} from '@/api/airline';
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, params) {
    // var data = params.searchForm;
    // var searchForm = {};
    // for (var attr in data) {
    //   if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
    //     searchForm[attr] = data[attr];
    //   }
    // }
    // params.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getPageList(params)
        .then(data => {
          
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    const { airlineCode } = params;
    return new Promise((resolve, reject) => {
      getOne(airlineCode)
        .then(data => {
          
          resolve(data);
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
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      getTotal(params)
        .then(data => {
          
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, params) {
    const { airlineCode } = params;
    return new Promise((resolve, reject) => {
      removeOne(airlineCode)
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
