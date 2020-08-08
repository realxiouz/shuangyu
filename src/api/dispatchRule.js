import request from '@/utils/request';

export function getOne(orderRuleId) {
  return request({
    url: `/dispatch/rule/${orderRuleId}`,
    method: 'get',
  });
}

export function save(data) {
  return request({
    url: '/dispatch/rule/save',
    method: 'post',
    data
  });
}

export function getList(data) {
  return request({
    url: `/dispatch/rule/list`,
    method: 'get',
    params: data.searchForm
  });
}

export function removeOne(data) {
  return request({
    url: '/dispatch/rule/remove/one/' + data,
    method: 'delete'
  });
}
