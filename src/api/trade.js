import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/trade/get/list`,
    method: 'get',
    params: params
  });
}

export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/finance/trade/get/root/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getOne(id) {
  return request({
    url: `/finance/trade/get/one/${id}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/finance/trade/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/trade/remove/one/${id}`,
    method: 'delete'
  });
}

export function save(data) {
  return request({
    url: `/finance/trade/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/finance/trade/update/one`,
    method: 'put',
    data
  });
}

export function getTreeList(filter) {
  return request({
    url: `/finance/trade/get/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/finance/trade/get/async/tree/${pid}`,
    method: 'get',
    params: filter
  });
}
