import request from '@/utils/request';

export function addAirport(data) {
  return request({
    url: '/flight/airport/add/one',
    method: 'post',
    data
  });
}

export function getAirportPageList(data) {
  return request({
    url: '/flight/airport/page/list/'+data.pageFlag+'/'+data.pageSize+'/'+data.lastId,
    method: 'get'
  });
}

export function getAirportTotal(params) {
  return request({
    url: '/flight/airport/total',
    method: 'get',
    params
  });
}

export function removeAirport(data) {
  return request({
    url: '/flight/airport/remove/one/'+data,
    method: 'delete'
  });
}

export function updateAirport(data) {
  return request({
    url: '/flight/airport/update/one',
    method: 'post',
    data
  });
}
