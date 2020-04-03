import { getPageList } from '@/api/orderInfo';
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
    // getTotal({ commit }, params) {
    //     return new Promise((resolve, reject) => {
    //         getTotal(params)
    //             .then(response => {
    //                 const { data } = response;
    //                 resolve(data);
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
