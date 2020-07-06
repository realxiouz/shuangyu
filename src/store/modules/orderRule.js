import {saveOrderRule, getOrderRulePageList, removeOrderRule, getOrderRuleTotal} from '@/api/orderRule';
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
  save({commit}, params) {
    return new Promise((resolve, reject) => {
      saveOrderRule(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  list({commit}, params) {
    var data= params.searchForm;
    var searchForm = {};
    for (var attr in data){
      if (data[attr]!=null && data[attr]!=undefined && data[attr]!=''){
        searchForm[attr] = data[attr];
      }
    }
    params.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getOrderRulePageList(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  total({commit}, params) {
    return new Promise((resolve, reject) => {
      getOrderRuleTotal(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, data) {
    return new Promise((resolve, reject) => {
      removeOrderRule(data)
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
