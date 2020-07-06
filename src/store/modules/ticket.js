import { getList, getTotal,getCount} from "@/api/ticket";
import { getToken } from "@/utils/auth";


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
    getList({ commit }, params) {
        const { filters } = params;
        return new Promise((resolve, reject) => {
            getList(filters)
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
    getCount({ commit }, params) {
        const { filters } = params;
        return new Promise((resolve, reject) => {
            getCount(filters)
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
