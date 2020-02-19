import request from '@/utils/request';

export function addAirport(data) {
  return request({
    url: '/flight/airport/add/one',
    method: 'post',
    data
  });
}

export function getAirportList() {
  return request({
    url: '/flight/airport/list',
    method: 'get'
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
