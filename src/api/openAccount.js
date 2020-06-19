import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/third/open/account/add/one',
    method: 'post',
    data
  });
}

export function addMany(data) {
  return request({
    url: '/third/open/account/add/many',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/third/open/account/update/one',
    method: 'post',
    data
  });
}

export function removeOne(openAccountId) {
  return request({
    url: `/third/open/account/remove/one/${openAccountId}`,
    method: 'delete'
  });
}

export function getOne(openAccountId) {
  return request({
    url: `/third/open/account/one/${openAccountId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/third/open/account/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/third/open/account/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/third/open/account/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
