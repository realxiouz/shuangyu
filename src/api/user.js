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

export function removeOne(data) {
  return request({
    url: `/user/remove/one/${data}`,
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

export function getOne(data) {
  return request({
    url: `/user/one/${data}`,
    method: 'get'
  });
}

export function getList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    params:data
  });
}

export function getTotal(data) {
  return request({
    url: `/user/total`,
    method: 'get',
    params: data
  });
}

export function getPageList(data) {
  return request({
    url: `/user/page/list/${data.pageFlag}/${data.pageSize}/${data.lastId}`,
    method: 'get',
    params: data.filter
  });
}
