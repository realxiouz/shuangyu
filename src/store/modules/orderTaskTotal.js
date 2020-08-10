import { getPageList, getTotal, getPendingTotal } from '@/api/orderTaskTotal';
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
        const { filters } = args;
        return new Promise((resolve, reject) => {
            getPageList(filters)
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
