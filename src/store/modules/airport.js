import {addOne,updateOne,removeOne,getOne,getOneByAirportName,getList,getTotal,getPageList} from '@/api/airport';

const actions = {
  addOne({commit}, args) {
    return new Promise((resolve, reject) => {
      addOne(args)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const{airportCode,data}=args
      updateOne(airportCode,data)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {airportCode} = args;
      removeOne(airportCode)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOne({commit}, args) {
    return new Promise((resolve, reject) => {
      const {airportCode} = args;
      getOne(airportCode)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOneByAirportName({commit}, args) {
    return new Promise((resolve, reject) => {
      const {airportName} = args;
      getOneByAirportName(airportName)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTotal({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getTotal(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {filter} = args;
      getList(filter)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getPageList({commit}, args) {
    return new Promise((resolve, reject) => {
      const {pageFlag, pageSize, ...params} = args;
      getPageList(pageFlag, pageSize, params)
        .then(data => {
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
