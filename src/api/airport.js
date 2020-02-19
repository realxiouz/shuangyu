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
    url: '/admin/user/list',
    method: 'get'
  });
}
