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

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url:  `/flight/airline/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getList(params) {
  return request({
    url: '/flight/airline/list',
    method: 'get',
    params: params.searchForm
  });
}

export function removeOne(airlineCode) {
  return request({
    url: `/flight/airline/remove/one/${airlineCode}`,
    method: 'delete'
  });
}
