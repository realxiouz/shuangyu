import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/policy/order/detail/add/one',
    method: 'post',
    data
  });
}

export function updateOne(detailId, data) {
  return request({
    url: `/policy/order/detail/update/one/${detailId}`,
    method: 'put',
    data
  });
}

export function removeOne(detailId) {
  return request({
    url: `/policy/order/detail/remove/one/${detailId}`,
    method: 'delete'
  });
}

export function getOne(detailId) {
  return request({
    url: `/policy/order/detail/one/${detailId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/policy/order/detail/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/policy/order/detail/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/policy/order/detail/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}
