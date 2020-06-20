import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/qunar/tts/policy/config/save/one',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: '/qunar/tts/policy/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/qunar/tts/policy/config/update/one',
    method: 'post',
    data
  });
}

export function removeOne(configId) {
  return request({
    url: `/qunar/tts/policy/config/remove/one/${configId}`,
    method: 'delete'
  });
}

export function getOne(configId) {
  return request({
    url: `/qunar/tts/policy/config/one/${configId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/qunar/tts/policy/config/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/qunar/tts/policy/config/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/qunar/tts/policy/config/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}
