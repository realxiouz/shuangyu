import request from '@/utils/request';

// 查询原始单
export function getList(params) {
  return request({
    url: '/eterm/order/list',
    method: 'get',
    params
  });
}

// 查询原始单数量
export function getTotal(params) {
  return request({
    url: '/eterm/order/total',
    method: 'get',
    params
  });
}

// Eterm导单
export function exportOrder(data) {
  return request({
    url: '/eterm/order/export',
    method: 'post',
    data
  });
}