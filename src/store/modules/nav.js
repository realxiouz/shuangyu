import { deleteOne ,addNav, edit, getOneNav, getNavList} from '@/api/nav';

const actions = {
  delete({ commit }, Id){
    return new Promise((resolve, reject) => {
      deleteOne(Id)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  add({ commit }, params){
    return new Promise((resolve, reject) => {
      addNav(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  edit({ commit }, params){
    return new Promise((resolve, reject) => {
      edit(params)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({ commit }, Id){
    return new Promise((resolve, reject) => {
      getOneNav(Id)
        .then(response => {
          //const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({ commit },params){
    debugger;
    return new Promise((resolve, reject) => {
      getNavList(params)
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
