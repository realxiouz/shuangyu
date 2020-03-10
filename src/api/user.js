import request from '@/utils/request';

export function signIn(data) {
  return request({
    url: '/user/sign/in',
    method: 'post',
    data
  });
}

export function signOut() {
  return request({
    url: '/admin/user/sign/out',
    method: 'post'
  });
}

export function addOne(data) {
  debugger
  return request({
    url: '/user/add/one',
    method: 'post',
    data
  });
}

export function removeOne(userID) {
  return request({
    url: `/user/remove/one/${userID}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/user/update/one',
    method: 'post',
    data
  });
}

export function getOne(userID) {
  return request({
    url: `/user/one/${userID}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: '/user/list',
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: `/user/total`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/user/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
