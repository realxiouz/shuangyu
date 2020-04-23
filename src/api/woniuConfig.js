import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/open/config/save',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: '/open/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/open/config/update/one',
    method: 'post',
    data
  });
}

export function removeOne(configId) {
  return request({
    url: `/open/config/remove/one/${configId}`,
    method: 'delete'
  });
}

export function getOne(configId) {
  return request({
    url: `/open/config/one/${configId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/open/config/list`,
    method: 'get',
    params: filter
  });
}

