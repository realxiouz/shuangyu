import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/policy/order/add/one',
    method: 'post',
    data
  });
}

export function updateOne(orderNo, data) {
  return request({
    url: `/policy/order/update/one/${orderNo}`,
    method: 'put',
    data
  });
}

export function inWarehouseOrder(orderNo, data) {
  return request({
    url: `/policy/order/update/warehouse/${orderNo}`,
    method: 'put',
    data
  });
}

export function removeOne(orderNo) {
  return request({
    url: `/policy/order/remove/one/${orderNo}`,
    method: 'delete'
  });
}

export function confirmOrder(orderNo) {
  return request({
    url: `/policy/order/confirm/one/${orderNo}`,
    method: 'put'
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

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/policy/order/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}
