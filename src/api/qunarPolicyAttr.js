import request from '@/utils/request';

export function getOne(id) {
  return request({
    url: `/qunar/tts/policy/attr/get/one/${id}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/qunar/tts/policy/attr/save/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/qunar/tts/policy/attr/get/list`,
    method: 'get',
    params
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/qunar/tts/policy/attr/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(id) {
  return request({
    url: `/qunar/tts/policy/attr/remove/one/${id}`,
    method: 'delete'
  });
}
