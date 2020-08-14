import {
  getOne,
  save,
  getPageList,
  getList,
  removeOne,
  getTotal
} from '@/api/airline';

const state = {

};

const mutations = {

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
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, ...params} = args
      getPageList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, args) {
    const { airlineCode } = args;
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
    const { airlineCode } = args;
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
