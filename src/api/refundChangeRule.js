import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/flight/refund/change/rule/save',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/flight/refund/change/rule/one/${id}`,
    method: 'get'
  });
}

export function getPageList(data) {
  return request({
    url: '/flight/refund/change/rule/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/flight/refund/change/rule/total',
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: '/flight/refund/change/rule/remove/one/' + data,
    method: 'delete'
  });
}
