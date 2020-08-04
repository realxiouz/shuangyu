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

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/flight/refund/change/rule/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
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
