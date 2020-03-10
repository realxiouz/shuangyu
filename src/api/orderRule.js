import request from '@/utils/request';

export function saveOrderRule(data) {
  return request({
    url: '/order/rule/save',
    method: 'post',
    data
  });
}

export function getOrderRulePageList(data) {
  return request({
    url: '/order/rule/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}

export function getOrderRuleTotal(params) {
  return request({
    url: '/order/rule/total',
    method: 'get',
    params
  });
}

export function removeOrderRule(data) {
  return request({
    url: '/order/rule/remove/one/' + data,
    method: 'delete'
  });
}
