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

export function getPageList(pageFlag, pageSize, params) {
  let url;
  if (params.lastId){
    url = `/finance/account/subject/get/page/list/${pageFlag}/${pageSize}`;
  } else {
    url = `/finance/account/subject/get/page/list/${pageFlag}/${pageSize}/${params.lastId}`;
  }
  return request({
    url: url,
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

export function update(id, data) {
  return request({
    url: `/finance/account/subject/update/one/${id}`,
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
