import request from '@/utils/request';

export function saveOrder(data) {
  return request({
    url: '/policy/order/save',
    method: 'post',
    data
  });
}

export function confirmOrder(data) {
  return request({
    url: '/policy/order/confirm/one',
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
    url: `/policy/order/in/warehouse/${orderNo}`,
    method: 'put',
    data
  });
}
export function outWarehouseOrder(orderNo, data) {
  return request({
    url: `/policy/order/out/warehouse/${orderNo}`,
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

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/policy/order/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getPurchaseList(rootOrderNo) {
  return request({
    url: `/policy/order/all/purchase/${rootOrderNo}`,
    method: 'get'
  })
}

export function getSellList(rootOrderNo) {
  return request({
    url: `/policy/order/all/sell/${rootOrderNo}`,
    method: 'get'
  })
}

export function orderRefund(data) {
  return request({
    url: `/policy/order/return/one`,
    method: 'post',
    data
  })
}

export function orderChange(data) {
  return request({
    url: `/policy/order/change/one`,
    method: 'post',
    data
  })
}

export function orderChangeInOut(data) {
  return request({
    url: `/policy/order/change/in/out`,
    method: 'post',
    data
  })
}

