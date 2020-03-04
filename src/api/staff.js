import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/staff/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/staff/update/one',
    method: 'post',
    data
  });
}

export function removeOne(params) {
  return request({
    url: `/staff/remove/one/${params}`,
    method: 'delete'
  });
}

export function getOne(params) {
  return request({
    url: `/staff/one/${params}`,
    method: 'get'
  });
}

export function getList(params) {
  return request({
    url: `/staff/list`,
    method: 'get',
    params
  });
}

export function getTotal(params) {
  return request({
    url: '/staff/total',
    method: 'get',
    params
  });
}

export function getPageList(params) {
  return request({
    url: `/staff/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: 'get',
    params: params.filter
  });
}
