import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/fund/account/get/list`,
    method: 'get',
    params: params
  });
}

export function getRootPageList(params) {
  return request({
    url: `/finance/fund/account/get/root/list/page/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params: params
  });
}

export function getOne(params) {
  return request({
    url: `/finance/fund/account/get/one/${params.accountId}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url: `/finance/fund/account/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params: params
  });
}

export function removeOne(params) {
  return request({
    url: `/finance/fund/account/remove/one/${params.accountId}`,
    method: 'delete'
  });
}

export function saveOne(data) {
  return request({
    url: `/finance/fund/account/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/finance/fund/account/update/one/${data.accountId}`,
    method: 'put',
    data
  });
}

export function getAsyncTreeList(params) {
  return request({
    url: `/finance/fund/account/get/async/tree/${params.pid}`,
    method: 'get',
    params: params
  });
}

export function getTreeList(params) {
  return request({
    url: `/finance/fund/account/get/tree/list`,
    method: 'get',
    params: params
  });
}

