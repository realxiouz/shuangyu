import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/flight/airline/save',
    method: 'post',
    data
  });
}

export function getOne(airlineCode) {
  return request({
    url: `/flight/airline/one/${airlineCode}`,
    method: 'get'
  });
}

export function getPageList(params) {
  return request({
    url:  `/flight/airline/page/list/${params.pageFlag}/${params.pageSize}/${params.lastId}`,
    method: 'get',
    params: params.searchForm
  });
}

export function getList(params) {
  return request({
    url: '/flight/airline/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/flight/airline/total',
    method: 'get',
    params:params
  });
}

export function removeOne(airlineCode) {
  return request({
    url: `/flight/airline/remove/one/${airlineCode}`,
    method: 'delete'
  });
}
