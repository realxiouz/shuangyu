import {getList, getListByNo, searchFlightPrice, order} from "@/api/policyProduct";

const actions = {
  getList({commit}, args) {
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
  getListByNo({commit}, args) {
    const {sellerOrderNo, ...params } = args
    return new Promise((resolve, reject) => {
      getListByNo(sellerOrderNo, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  searchFlightPrice(_, args) {
    return new Promise((resolve, reject) => {
      searchFlightPrice(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    })
  },
  order(_, args) {
    return new Promise((resolve, reject) => {
      order(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    })
  }
};

export default {
  namespaced: true,
  actions
};
