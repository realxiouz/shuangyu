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
  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      addOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      updateOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 查询原始单
  getList({commit}, args) {
    const {filters} = args;
    return new Promise((resolve, reject) => {
      getList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 导单
  Export({commit}, args) {
    const {filters} = args;
    return new Promise((resolve, reject) => {
      Export(filters);
    });
  },
  getOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {domain} = args;
      getOne(domain)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 查询原始单数量
  getTotal({commit}, args) {
    const {filters} = args;
    return new Promise((resolve, reject) => {
      getTotal(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据原始单号导单
  exportOrderNo({commit}, args) {
    return new Promise((resolve, reject) => {
      exportOrderNo(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据lastId增量导单
  exportLastId({commit}, args) {
    return new Promise((resolve, reject) => {
      exportLastId(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 根据文件导单
  exportOrderFile({commit}, args) {
    return new Promise((resolve, reject) => {
      exportOrderFile(args)
        .then(data => {
          resolve(data);
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
