import request from '@/utils/request';

export function addOne(data) {
  debugger
  return request({
    url: '/fare/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/fare/update/one',
    method: 'post',
    data
  });
}

export function removeOne(fareID) {
  return request({
    url: `/fare/remove/one/${fareID}`,
    method: 'delete'
  });
}

export function getOne(fareID) {
  return request({
    url: `/fare/one/${fareID}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/fare/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/fare/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/fare/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
