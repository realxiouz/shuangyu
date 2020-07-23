import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/flight/segment/save',
    method: 'post',
    data
  });
}

export function getOne(segment) {
  return request({
    url: `/flight/segment/one/${segment}`,
    method: 'get'
  });
}

export function getPageList(args) {
  const {pageFlag, pageSize, ...params} = args;
  return request({
    url: `/flight/segment/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getList(params) {
  return request({
    url: '/flight/segment/list',
    method: 'get',
    params: params.searchForm
  });
}

export function getTotal(params) {
  return request({
    url: '/flight/segment/total',
    method: 'get',
    params: params
  });
}

export function removeOne(segment) {
  return request({
    url: `/flight/segment/remove/one/${segment}`,
    method: 'delete'
  });
}
