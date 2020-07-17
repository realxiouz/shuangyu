import request from '@/utils/request';

export function saveOne(data) {
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

export function updateOne(id, data) {
  return request({
    url: `/qunar/tts/policy/config/update/one/${id}`,
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/qunar/tts/policy/config/get/one/${id}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/qunar/tts/policy/config/get/list`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/qunar/tts/policy/config/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function removeOne(id) {
  return request({
    url: `/qunar/tts/policy/config/remove/one/${id}`,
    method: 'delete'
  });
}
