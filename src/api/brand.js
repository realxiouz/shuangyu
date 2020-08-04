import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/policy/brand/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/policy/brand/update/one/${id}`,
    method: 'put',
    data
  });
}

export function removeOne(brandId) {
  return request({
    url: `/policy/brand/remove/one/${brandId}`,
    method: 'delete'
  });
}

export function getOne(brandId) {
  return request({
    url: `/policy/brand/one/${brandId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/policy/brand/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/policy/brand/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/policy/brand/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}
