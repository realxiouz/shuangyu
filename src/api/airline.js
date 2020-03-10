import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/flight/airline/save',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/flight/airline/one/${id}`,
    method: 'get'
  });
}

export function getPageList(data) {
  return request({
    url: '/flight/airline/page/list/' + data.pageFlag + '/' + data.pageSize + '/' + data.lastId,
    method: 'get',
    params: data.searchForm
  });
}

export function getList(data) {
  return request({
    url: '/flight/airline/list',
    method: 'get',
    params: data.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/flight/airline/total',
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: '/flight/airline/remove/one/' + data,
    method: 'delete'
  });
}
