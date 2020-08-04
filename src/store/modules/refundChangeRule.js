import {getOne, getPageList, getTotal, removeOne, save} from '@/api/refundChangeRule';
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
  getOne({commit}, args) {
    const {ruleId} = args;
    return new Promise((resolve, reject) => {
      getOne(ruleId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
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
  getPageList({commit}, args) {
    // var data = args.searchForm;
    // var searchForm = {};
    // for (var attr in data) {
    //   if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
    //     searchForm[attr] = data[attr];
    //   }
    // }
    // args.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, ...params} = args;
      getPageList(pageFlag, pageSize, params)
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
    const {ruleId} = args;
    return new Promise((resolve, reject) => {
      removeOne(ruleId)
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
