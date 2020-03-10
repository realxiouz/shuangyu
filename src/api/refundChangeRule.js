import request from '@/utils/request';

export function saveRefundChangeRule(data) {
  return request({
    url: '/flight/refund/change/rule/save',
    method: 'post',
    data
  });
}

export function getRefundChangeRule(id) {
  return request({
    url: `/flight/refund/change/rule/one/${id}`,
    method: 'get'
  });
}

export function getRefundChangeRulePageList(data) {
  return request({
    url: '/flight/refund/change/rule/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}

export function getRefundChangeRuleTotal(params) {
  return request({
    url: '/flight/refund/change/rule/total',
    method: 'get',
    params
  });
}

export function removeRefundChangeRule(data) {
  return request({
    url: '/flight/refund/change/rule/remove/one/' + data,
    method: 'delete'
  });
}
