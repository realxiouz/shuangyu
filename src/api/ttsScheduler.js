import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/tts/scheduler/save',
    method: 'post',
    data
  });
}

export function saveAndStart(data) {
  return request({
    url: '/tts/scheduler/save/start',
    method: 'post',
    data
  });
}

export function getOne(schedulerId) {
  return request({
    url: `/tts/scheduler/one/${schedulerId}`,
    method: 'get'
  });
}

export function start(schedulerId) {
  return request({
    url: `/tts/scheduler/start/${schedulerId}`,
    method: 'get'
  });
}

export function stop(schedulerId) {
  return request({
    url: `/tts/scheduler/stop/${schedulerId}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url:  `/tts/scheduler/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: 'get',
    params: params.searchForm
  });
}

export function getList(params) {
  return request({
    url: '/tts/scheduler/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getParamList(params) {
  return request({
    url: '/tts/scheduler/param/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/tts/scheduler/total',
    method: 'get',
    params:params
  });
}

export function removeOne(schedulerId) {
  return request({
    url: `/third/api/scheduler/remove/one/${schedulerId}`,
    method: 'delete'
  });
}
