import request from '@/utils/request';

export function saveAirline(data) {
  return request({
    url: '/flight/airline/save',
    method: 'post',
    data
  });
}

export function getAirlinePageList(data) {
  return request({
    url: '/flight/airline/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}

export function getAirlineTotal(params) {
  return request({
    url: '/flight/airline/total',
    method: 'get',
    params
  });
}

export function removeAirline(data) {
  return request({
    url: '/flight/airline/remove/one/' + data,
    method: 'delete'
  });
}
