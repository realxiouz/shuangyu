import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/currency/get/list`,
    method: 'get',
    params: params
  });
}

export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/finance/currency/get/root/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getOne(id) {
  return request({
    url: `/finance/currency/get/one/${id}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/finance/currency/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/currency/remove/one/${id}`,
    method: 'delete'
  });
}

export function save(data) {
  return request({
    url: `/finance/currency/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/finance/currency/update/one`,
    method: 'put',
    data
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/finance/currency/get/async/tree/${pid}`,
    method: 'get',
    params: filter
  });
}
