import {
  addOne,
  getAsyncTreeList,
  getList,
  getOne,
  getPageList,
  getRootPageList,
  getRootTotal,
  getTotal,
  getTreeList,
  removeOne,
  updateOne
} from '@/api/dept';
import { getToken } from '@/utils/auth';

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
  addOne({ commit }, args) {
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
  updateOne({ commit }, args) {
    const { deptId, ...data } = args;
    return new Promise((resolve, reject) => {
      updateOne(deptId, data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTreeList({ commit }, args) {
    const { filters } = args;
    return new Promise((resolve, reject) => {
      getTreeList(filters)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({ commit }, args) {
    const { filters } = args;
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
  removeOne({ commit }, args) {
    const { deptId } = args;
    return new Promise((resolve, reject) => {
      removeOne(deptId)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pageFlag, pageSize, ...params } = args;
      getPageList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRootPageList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pageFlag, pageSize, ...params } = args;
      getRootPageList(pageFlag, pageSize, params)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAsyncTreeList({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { pid, filter } = args;
      getAsyncTreeList(pid, filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRootTotal({ commit }, args) {
    const { filter } = args;
    return new Promise((resolve, reject) => {
      getRootTotal(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({ commit }, args) {
    const { filter } = args;
    return new Promise((resolve, reject) => {
      getTotal(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({ commit }, args) {
    const { deptId } = args;
    return new Promise((resolve, reject) => {
      getOne(deptId)
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
