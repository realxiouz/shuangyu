import request from '@/utils/request';

// 查询原始单
export function getList(data) {
  return request({
    url: '/qunar/order/get/list',
    method: 'post',
    data
  });
}

// 查询原始单数量
export function getTotal(params) {
  return request({
    url: '/qunar/order/get/total',
    method: 'get',
    params: params
  });
}

// 根据原始单号导单
export function exportOrderNo(sourceOrderNo) {
  return request({
    url: `/qunar/order/fetch/lose/order?sourceOrderNo=${sourceOrderNo}`,
    method: 'post',
  });
}

// 根据lastId增量导单
export function exportLastId(data) {
  return request({
    url: `/qunar/order/fetch/lose/orders?domain=${data.domain}&fromLastId=${data.fromLastId}&toLastId=${data.toLastId}`,
    method: 'post',
  });
}

// 根据文件导单
export function exportOrderFile(data) {
  return request({
    url: '/qunar/order/fetch/lose/orders/file',
    method: 'post',
    data
  });
}

export function getOne(domain) {
  return request({
    url: `/qunar/order/config/one/${domain}`,
    method: 'get'
  });
}

export function addOne(data) {
  return request({
    url: '/qunar/order/config/add/one',
    method: 'post',
    data
  });
}

export function save(data) {
  return request({
    url: '/qunar/order/config/save',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/qunar/order/config/update/one',
    method: 'post',
    data
  });
}

