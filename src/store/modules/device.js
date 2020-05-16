import { addOne, getList, getTotal, deleteById, editById,addMany } from '@/api/device';

const actions = {
    addOne({ commit }, params) {
        return new Promise((resolve, reject) => {
            addOne(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    addMany({ commit }, params) {
        return new Promise((resolve, reject) => {
            addMany(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    getList({ commit }, params) {
        return new Promise((resolve, reject) => {
            getList(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    deleteById({ commit }, params) {
        return new Promise((resolve, reject) => {
            deleteById(params)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    editById({ commit }, params) {
        return new Promise((resolve, reject) => {
            editById(params)
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
        return new Promise((resolve, reject) => {
            getTotal(params)
                .then(response => {
                    const { data } = response;
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
