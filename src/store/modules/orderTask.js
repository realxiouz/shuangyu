import { getPageList, getTotal } from '@/api/orderTask';
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
        var data = params.searchForm;
        var searchForm = {};
        for (var attr in data) {
            if (data[attr] != null && data[attr] != undefined && data[attr] != '') {
                searchForm[attr] = data[attr];
            }
        }
        params.searchForm = searchForm;
        return new Promise((resolve, reject) => {
            getPageList(params)
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
