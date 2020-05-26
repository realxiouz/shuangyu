import {
  addMany,
  addOne,
  associateUser,
  getList,
  getListByFirmId,
  getMany,
  getOne,
  getOneByFidAndUid,
  getPageList,
  getTotal,
  isExist,
  relationUser,
  removeOne,
  updateOne
} from "@/api/staff";
import {getToken} from "@/utils/auth";


const state = {
  token: getToken(),
  name: "",
  avatar: ""
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
  addMany({commit}, params) {
    return new Promise((resolve, reject) => {
      addMany(params)
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
  removeOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {staffId} = params;
      removeOne(staffId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, params) {
    return new Promise((resolve, reject) => {
      const {staffId} = params;
      getOne(staffId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOneByFidAndUid({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firmId, userId} = params;
      getOneByFidAndUid(firmId, userId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getTotal(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      getList(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  relationUser({commit}, params) {
    return new Promise((resolve, reject) => {
      const {staffId, userId} = params;
      relationUser(staffId, userId)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getListByFirmId({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firmId, filter} = params;
      getListByFirmId(firmId, filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, lastId, filter} = params;
      getPageList(pageFlag, pageSize, lastId, filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /*filter为对用户进行查询所需的条件*/
  associateUser({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filter} = params;
      associateUser(filter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMany({commit}, params) {
    return new Promise((resolve, reject) => {
      //const {staffIdList} = params;
      getMany(params)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  isExist({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filedValue, deptId} = params;
      isExist(deptId, filedValue)
        .then(response => {
          const {data} = response;
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
