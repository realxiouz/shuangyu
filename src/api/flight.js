import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/flight/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/flight/update/one',
    method: 'post',
    data
  });
}

export function removeOne(flightId) {
  return request({
    url: `/flight/remove/one/${flightId}`,
    method: 'delete'
  });
}

export function getOne(flightId) {
  return request({
    url: `/flight/one/${flightId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/flight/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/flight/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/flight/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
