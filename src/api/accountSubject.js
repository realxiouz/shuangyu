import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/account/subject/get/list`,
    method: 'get',
    params: params
  });
}

export function getRootPageList(params) {
  return request({
    url: `/finance/account/subject/get/root/list/page/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params: params
  });
}

export function getOne(params) {
  return request({
    url: `/finance/account/subject/get/one/${params.subjectId}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url: `/finance/account/subject/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params: params
  });
}

export function removeOne(params) {
  return request({
    url: `/finance/account/subject/remove/one/${params.subjectId}`,
    method: 'delete'
  });
}

export function saveOne(data) {
  return request({
    url: `/finance/account/subject/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/finance/account/subject/update/one/${data.subjectId}`,
    method: 'put',
    data
  });
}

export function getTreeList(params) {
  return request({
    url: `/finance/account/subject/get/tree/list`,
    method: 'get',
    params: params
  });
}

export function getAsyncTreeList(params) {
  return request({
    url: `/finance/account/subject/get/async/tree/${params.pid}`,
    method: 'get',
    params: params
  });
}
