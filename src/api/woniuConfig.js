import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/qunar/open/config/save',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: '/qunar/open/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/qunar/open/config/update/one',
    method: 'post',
    data
  });
}

export function removeOne(configId) {
  return request({
    url: `/qunar/open/config/remove/one/${configId}`,
    method: 'delete'
  });
}

export function getOne(filter) {
  return request({
    url: `/qunar/open/config/one`,
    method: 'get',
    params: filter
  });
}

export function getList(filter) {
  return request({
    url: `/qunar/open/config/list`,
    method: 'get',
    params: filter
  });
}

export function getSignList(bankCode,signedAccount) {
  return request({
    url: `/qunar/open/sign/up`,
    method: 'get'
  });
}

