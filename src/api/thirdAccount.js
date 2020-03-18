import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/third/account/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/third/account/update/one',
    method: 'post',
    data
  });
}

export function removeOne(thirdAccountId) {
  debugger
  return request({
    url: `/third/account/remove/one/${thirdAccountId}`,
    method: 'delete'
  });
}

export function getOne(thirdAccountId) {
  return request({
    url: `/third/account/one/${thirdAccountId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/third/account/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/third/account/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/third/account/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
