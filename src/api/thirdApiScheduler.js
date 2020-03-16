import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/third/api/scheduler/save',
    method: 'post',
    data
  });
}

export function getOne(schedulerId) {
  return request({
    url: `/third/api/scheduler/one/${schedulerId}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url:  `/third/api/scheduler/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: 'get',
    params: params.searchForm
  });
}

export function getList(params) {
  return request({
    url: '/third/api/scheduler/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/third/api/scheduler/total',
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
