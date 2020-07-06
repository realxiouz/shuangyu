import {
  addOne,
  exportLastId,
  exportOrderFile,
  exportOrderNo,
  getList,
  Export,
  getOne,
  getTotal,
  save
} from '@/api/otherOrderConfig/qunarOrderConfig';

const actions = {
  save({commit}, params) {
    return new Promise((resolve, reject) => {
      save(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOne({commit}, params) {
    return new Promise((resolve, reject) => {
      addOne(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, params) {
    return new Promise((resolve, reject) => {
      updateOne(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 查询原始单
  getList({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 导单
  Export({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      Export(filters);
    });
  },
  getOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {domain} = params;
      getOne(domain)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 查询原始单数量
  getTotal({commit}, params) {
    const {filters} = params;
    return new Promise((resolve, reject) => {
      getTotal(filters)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据原始单号导单
  exportOrderNo({commit}, sourceOrderNo) {
    return new Promise((resolve, reject) => {
      exportOrderNo(sourceOrderNo)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据lastId增量导单
  exportLastId({commit}, params) {
    return new Promise((resolve, reject) => {
      exportLastId(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据文件导单
  exportOrderFile({commit}, params) {
    return new Promise((resolve, reject) => {
      exportOrderFile(params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

}

export default {
  namespaced: true,
  actions
};
