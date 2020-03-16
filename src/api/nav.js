import request from '@/utils/request';

export function getPageList(pageFlag, pageSize, lastID, filter) {
  return request({
    url: `/nav/page/list/${pageFlag}/${pageSize}/${lastID}`,
    method: 'get',
    params: filter
  });
}

export function removeOne(navID) {
  return request({
    url: `/nav/remove/one/${navID}`,
    method: 'delete'
  });
}

export function getOne(navID) {
  return request({
    url: `/nav/one/${navID}`,
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
    filter
  });
}

export function getAllList(filter) {
  return request({
    url: '/nav/get/sync/tree',
    method: 'get',
    filter
  })
}
