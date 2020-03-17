import request from '@/utils/request';

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/nav/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}

export function removeOne(navId) {
  return request({
    url: `/nav/remove/one/${navId}`,
    method: 'delete'
  });
}

export function getOne(navId) {
  return request({
    url: `/nav/one/${navId}`,
    method: 'get'
  });
}

export function addOne(data) {
  return request({
    url: `/nav/add/one`,
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/nav/update/one',
    method: 'post',
    data
  });
}

export function getList(filter) {
  return request({
    url: '/nav/list',
    method: 'get',
    params: filter
  });
}

export function getAllList(filter) {
  return request({
    url: '/nav/get/sync/tree',
    method: 'get',
    params: filter
  })
}
