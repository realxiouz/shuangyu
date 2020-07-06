import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/account/subject/get/list`,
    method: 'get',
    params: params
  });
}

export function getRootPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/finance/account/subject/get/root/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getOne(id) {
  return request({
    url: `/finance/account/subject/get/one/${id}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/finance/account/subject/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/account/subject/remove/one/${id}`,
    method: 'delete'
  });
}

export function save(data) {
  return request({
    url: `/finance/account/subject/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/finance/account/subject/update/one`,
    method: 'put',
    data
  });
}

export function getTreeList(filter) {
  return request({
    url: `/finance/account/subject/get/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/finance/account/subject/get/async/tree/${pid}`,
    method: 'get',
    params: filter
  });
}
