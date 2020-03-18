import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/factory/tgq/product/save',
    method: 'post',
    data
  });
}

export function saveAndStart(data) {
  return request({
    url: '/factory/tgq/product/save/start',
    method: 'post',
    data
  });
}

export function getOne(schedulerId) {
  return request({
    url: `/factory/tgq/product/one/${schedulerId}`,
    method: 'get'
  });
}

export function start(schedulerId) {
  return request({
    url: `/factory/tgq/product/start/${schedulerId}`,
    method: 'get'
  });
}

export function stop(schedulerId) {
  return request({
    url: `/factory/tgq/product/stop/${schedulerId}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url:  `/factory/tgq/product/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: 'get',
    params: params.searchForm
  });
}

export function getList(params) {
  return request({
    url: '/factory/tgq/product/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getParamList(params) {
  return request({
    url: '/factory/tgq/product/param/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/factory/tgq/product/total',
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
