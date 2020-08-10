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
  save({commit}, args) {
    return new Promise((resolve, reject) => {
      saveOrderRule(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  list({commit}, args) {
    var data= args.searchForm;
    var searchForm = {};
    for (var attr in data){
      if (data[attr]!=null && data[attr]!=undefined && data[attr]!=''){
        searchForm[attr] = data[attr];
      }
    }
    args.searchForm = searchForm;
    return new Promise((resolve, reject) => {
      getOrderRulePageList(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  total({commit}, args) {
    return new Promise((resolve, reject) => {
      getOrderRuleTotal(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, data) {
    return new Promise((resolve, reject) => {
      removeOrderRule(data)
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
