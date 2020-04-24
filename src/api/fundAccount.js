import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/finance/account/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/finance/account/update/one',
    method: 'post',
    data
  });
}

export function removeOne(accountId) {
  return request({
    url: `/finance/account/remove/one/${accountId}`,
    method: 'delete'
  });
}

export function getOne(accountId) {
  return request({
    url: `/finance/account/one/${accountId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/finance/account/list`,
    method: 'get',
    params: filter
  });
}
export function getTreeList(filter) {
  return request({
    url: `/finance/account/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/finance/account/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/finance/account/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
