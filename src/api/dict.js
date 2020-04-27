import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/firm/dict/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/firm/dict/update/one',
    method: 'post',
    data
  });
}

export function removeOne(dictId) {
  return request({
    url: `/firm/dict/remove/one/${dictId}`,
    method: 'delete'
  });
}

export function getOne(dictId) {
  return request({
    url: `/firm/dict/one/${dictId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/firm/dict/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/firm/dict/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/firm/dict/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
