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

export function updateOne(data) {
  return request({
    url: `/qunar/tts/policy/config/update/one/${data.policyConfigId}`,
    method: 'post',
    data
  });
}

export function getOne(params) {
  return request({
    url: `/qunar/tts/policy/config/get/one/${params.policyConfigId}`,
    method: 'get'
  });
}

export function getList(params) {
  return request({
    url: `/qunar/tts/policy/config/get/list`,
    method: 'get',
    params: params
  });
}

export function getPageList(params) {
  return request({
    url: `/qunar/tts/policy/config/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params: params
  });
}

export function removeOne(data) {
  return request({
    url: `/qunar/tts/policy/config/remove/one/${data.policyConfigId}`,
    method: 'delete'
  });
}
