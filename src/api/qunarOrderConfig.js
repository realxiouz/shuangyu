import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/qunar/order/config/add/one',
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

export function removeOne(domain) {
  return request({
    url: `/qunar/order/config/remove/one/${domain}`,
    method: 'delete'
  });
}

export function getOne(domain) {
  return request({
    url: `/qunar/order/config/one/${domain}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/qunar/order/config/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/qunar/order/config/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/qunar/order/config/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
