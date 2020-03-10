import request from '@/utils/request';

export function saveAirport(data) {
  return request({
    url: '/flight/airport/save',
    method: 'post',
    data
  });
}

export function getAirport(id) {
  return request({
    url: `/flight/airport/one/${id}`,
    method: 'get'
  });
}

export function getAirportPageList(data) {
  return request({
    url: '/flight/airport/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
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
    url: '/flight/airport/remove/one/' + data,
    method: 'delete'
  });
}
