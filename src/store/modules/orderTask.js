import { taskTransfer,taskRemark, taskSubmit, taskCancel, getPageList, getTotal, getPendingTotal ,getGroupList} from '@/api/orderTask';
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
    getPageList({ commit }, params) {
        const { filters } = params;
        return new Promise((resolve, reject) => {
            getPageList(filters)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getTotal({ commit }, params) {
        const { filters } = params;
        return new Promise((resolve, reject) => {
            getTotal(filters)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getPendingTotal({ commit }, params) {
        const { filters } = params;
        return new Promise((resolve, reject) => {
            getPendingTotal(filters)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
  getGroupList({ commit }, params) {
        const { filters } = params;
        return new Promise((resolve, reject) => {
          getGroupList(filters)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 任务提交
    taskSubmit({ commit }, params) {
        return new Promise((resolve, reject) => {
            taskSubmit(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 任务取消
    taskCancel({ commit }, params) {
        return new Promise((resolve, reject) => {
            taskCancel(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 任务备注
    taskRemark({ commit }, params) {
        return new Promise((resolve, reject) => {
            taskRemark(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 批量转单
    taskTransfer({ commit }, params) {
        return new Promise((resolve, reject) => {
            taskTransfer(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },


};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
