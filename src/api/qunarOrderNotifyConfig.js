import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/qunar/order/notify/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/qunar/order/notify/config/update/one',
    method: 'post',
    data
  });
}

export function removeOne(domain) {
  return request({
    url: `/qunar/order/notify/config/remove/one/${domain}`,
    method: 'delete'
  });
}

export function getOne(domain) {
  return request({
    url: `/qunar/order/notify/config/one/${domain}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/qunar/order/notify/config/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/qunar/order/notify/config/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/qunar/order/notify/config/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
