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

export function getPageList(params) {
  return request({
    url: `/flight/refund/change/rule/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: '/flight/refund/change/rule/total',
    method: 'get',
    params: params
  });
}

export function removeOne(id) {
  return request({
    url: `/flight/refund/change/rule/remove/one/${id}`,
    method: 'delete'
  });
}
