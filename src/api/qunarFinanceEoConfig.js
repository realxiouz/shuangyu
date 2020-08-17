import request from '@/utils/request';

export function saveOne(data) {
  return request({
    url: '/qunar/tts/finance/eo/config/save/one',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: '/qunar/tts/finance/eo/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: `/qunar/tts/finance/eo/config/update/one/${data.foConfigId}`,
    method: 'post',
    data
  });
}

export function getOne(params) {
  return request({
    url: `/qunar/tts/finance/eo/config/get/one/${params.foConfigId}`,
    method: 'get'
  });
}

export function getList(params) {
  return request({
    url: `/qunar/tts/finance/eo/config/get/list`,
    method: 'get',
    params: params
  });
}

export function getPageList(params) {
  return request({
    url: `/qunar/tts/finance/eo/config/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params: params
  });
}

export function removeOne(data) {
  return request({
    url: `/qunar/tts/finance/eo/config/remove/one/${data.foConfigId}`,
    method: 'delete'
  });
}
