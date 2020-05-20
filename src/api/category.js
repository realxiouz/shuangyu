import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/firm/category/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/firm/category/update/one/${id}`,
    method: 'post',
    data
  });
}

export function removeOne(categoryId) {
  return request({
    url: `/firm/category/remove/one/${categoryId}`,
    method: 'delete'
  });
}

export function getOne(categoryId) {
  return request({
    url: `/firm/category/one/${categoryId}`,
    method: 'get'
  });
}

export function getTreeList(filter) {
  return request({
    url: `/firm/category/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getList(filter) {
  return request({
    url: `/firm/category/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/firm/category/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/firm/category/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
