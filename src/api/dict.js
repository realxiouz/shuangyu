import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/admin/dict/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/admin/dict/update/one/${id}`,
    method: 'put',
    data
  });
}

export function removeOne(dictId) {
  return request({
    url: `/admin/dict/remove/one/${dictId}`,
    method: 'delete'
  });
}

export function getOne(dictId) {
  return request({
    url: `/admin/dict/one/${dictId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/admin/dict/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/admin/dict/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/admin/dict/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}
