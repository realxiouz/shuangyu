import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/policy/order/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/policy/order/update/one',
    method: 'post',
    data
  });
}

export function removeOne(orderNo) {
  return request({
    url: `/policy/order/remove/one/${orderNo}`,
    method: 'delete'
  });
}

export function getOne(orderNo) {
  return request({
    url: `/policy/order/one/${orderNo}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/policy/order/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/policy/order/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/policy/order/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
