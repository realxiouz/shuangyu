import request from '@/utils/request';

export function saveRefundChangeRule(data) {
  return request({
    url: '/flight/refundChangeRule/save',
    method: 'post',
    data
  });
}

export function getRefundChangeRulePageList(data) {
  return request({
    url: '/flight/refundChangeRule/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}

export function getRefundChangeRuleTotal(params) {
  return request({
    url: '/flight/refundChangeRule/total',
    method: 'get',
    params
  });
}

export function removeRefundChangeRule(data) {
  return request({
    url: '/flight/refundChangeRule/remove/one/' + data,
    method: 'delete'
  });
}
