import { removeTaskOrder, getTaskInfo, taskTransfer, taskRemark, taskSubmit, taskCancel, getPageList, getTotal, getPendingTotal, getGroupList } from '@/api/orderTask';
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
    getPageList({ commit }, args) {
        return new Promise((resolve, reject) => {
            getPageList(args)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getTotal({ commit }, args) {
        const { filters } = args;
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
    getPendingTotal({ commit }, args) {
        const { filters } = args;
        return new Promise((resolve, reject) => {
            getPendingTotal(filters)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getGroupList({ commit }, args) {
        const { filters } = args;
        return new Promise((resolve, reject) => {
            getGroupList(filters)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 任务提交
    taskSubmit({ commit }, args) {
        return new Promise((resolve, reject) => {
            taskSubmit(args)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 任务取消
    taskCancel({ commit }, args) {
        return new Promise((resolve, reject) => {
            taskCancel(args)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 任务备注
    taskRemark({ commit }, args) {
        return new Promise((resolve, reject) => {
            taskRemark(args)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 批量转单
    taskTransfer({ commit }, args) {
        return new Promise((resolve, reject) => {
            taskTransfer(args)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 批量转单
    getTaskInfo({ commit }, taskId) {
        return new Promise((resolve, reject) => {
            getTaskInfo(taskId)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    removeTaskOrder({ commit }, args) {
        return new Promise((resolve, reject) => {
            removeTaskOrder(args)
                .then(data => {
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
