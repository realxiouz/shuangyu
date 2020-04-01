import {
  addOne,
  addMany,
  updateOne,
  removeOne,
  getOne,
  getOneByFidAndUid,
  getList,
  getTotal,
  getPageList,
  getPrepareUserList,
  getMany,
  permissionsForUpdate,
  permissionsForAdd,
  existedStaffList
} from "@/api/staff";
import {getToken, setToken, removeToken} from "@/utils/auth";


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
      const {staffId, deptId} = params;
      removeOne(staffId, deptId)
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
  getPrepareUserList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {firmId, deptId, filter} = params;
      getPrepareUserList(firmId, deptId, filter)
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
  permissionsForUpdate({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filedValue, staffId} = params;
      permissionsForUpdate(filedValue, staffId)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  permissionsForAdd({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filedValue} = params;
      permissionsForAdd(filedValue)
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  existedStaffList({commit}, params) {
    return new Promise((resolve, reject) => {
      const {filedValue} = params;
      existedStaffList(filedValue)
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
  actions
};
