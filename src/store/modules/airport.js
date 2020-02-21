import {saveAirport, getAirportPageList, removeAirport, getAirportTotal} from '@/api/airport';
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
      saveAirport(params)
        .then(response => {
          //const { data } = response;
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
      getAirportPageList(params)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  total({commit}, params) {
    return new Promise((resolve, reject) => {
      getAirportTotal(params)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, data) {
    return new Promise((resolve, reject) => {
      removeAirport(data)
        .then(response => {
          const {data} = response;
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