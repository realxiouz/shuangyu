import request from '@/utils/request';

// 获取蜗牛原始单

export function getList(params) {
  return request({
    url: '/qunar/woniu/order/list',
    method: 'get',
    params: params
  });
}


// 获取蜗牛原始单数量
export function getTotal(params) {
  return request({
    url: '/qunar/woniu/order/total',
    method: 'get',
    params
  });
}

export function getFlight(data) {
  return request({
    url: `/qunar/open/product/source/get/flight`,
    method: 'post',
    data
  });
}

export function getPrice(data) {
  return request({
    url: `/qunar/open/product/source/get/price`,
    method: 'post',
    data
  });
}