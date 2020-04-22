import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/open/account/add/one',
    method: 'post',
    data
  });
}

export function addMany(data) {
  debugger
  return request({
    url: '/open/account/add/many',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/open/account/update/one',
    method: 'post',
    data
  });
}

export function removeOne(openAccountId) {
  return request({
    url: `/open/account/remove/one/${openAccountId}`,
    method: 'delete'
  });
}

export function getOne(openAccountId) {
  return request({
    url: `/open/account/one/${openAccountId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/open/account/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/open/account/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/open/account/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
