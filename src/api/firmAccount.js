import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/firm/account/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/firm/account/update/one',
    method: 'post',
    data
  });
}

export function removeOne(accountId) {
  return request({
    url: `/firm/account/remove/one/${accountId}`,
    method: 'delete'
  });
}

export function getOne(accountId) {
  return request({
    url: `/firm/account/one/${accountId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/firm/account/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/firm/account/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/firm/account/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
