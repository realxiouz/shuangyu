import { deleteOne ,addNav, update, getOneNav, getPageList, getNavList} from '@/api/nav';

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
  updateOne({ commit }, params){
    return new Promise((resolve, reject) => {
      update(params)
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
  getPageList({ commit },params){
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
  getNavList(){
    return new Promise((resolve, reject) => {
      getNavList()
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default {
  namespaced: true,
  actions
};
