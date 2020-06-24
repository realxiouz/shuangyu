import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/admin/category/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/admin/category/update/one/${id}`,
    method: 'put',
    data
  });
}

export function removeOne(categoryId) {
  return request({
    url: `/admin/category/remove/one/${categoryId}`,
    method: 'delete'
  });
}

export function getOne(categoryId) {
  return request({
    url: `/admin/category/one/${categoryId}`,
    method: 'get'
  });
}

export function getTreeList(filter) {
  return request({
    url: `/admin/category/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getList(filter) {
  return request({
    url: `/admin/category/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/admin/category/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/admin/category/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
