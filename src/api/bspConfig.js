import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/bsp/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/bsp/config/update/one',
    method: 'post',
    data
  });
}

export function removeOne(configId) {
  return request({
    url: `/bsp/config/remove/one/${configId}`,
    method: 'delete'
  });
}

export function getOne(merchantId) {
  return request({
    url: `/bsp/config/one/${merchantId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/bsp/config/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/bsp/config/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/bsp/config/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
