import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/finance/fund/account/save/one',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: '/finance/fund/account/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/finance/fund/account/update/one',
    method: 'post',
    data
  });
}

export function removeOne(accountId) {
  return request({
    url: `/finance/fund/account/remove/one/${accountId}`,
    method: 'delete'
  });
}

export function getOne(accountId) {
  return request({
    url: `/finance/fund/account/one/${accountId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/finance/fund/account/get/list`,
    method: 'get',
    params: filter
  });
}

export function getTreeList(filter) {
  return request({
    url: `/finance/fund/account/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/finance/fund/account/get/total',
    method: 'get',
    params: filter
  });
}

export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/finance/fund/account/get/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });

}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/finance/fund/account/async/tree/list/${pid}`,
    method: `get`,
    params: filter
  });
}
