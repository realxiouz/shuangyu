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
    getPageList({ commit }, params) {
        const { filters } = params;
        return new Promise((resolve, reject) => {
            getPageList(filters)
                .then(response => {
                    resolve(response);
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
                    resolve(response);
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
                    resolve(response);
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
