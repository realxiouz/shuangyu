import request from '@/utils/request';

export function signIn(data) {
  return request({
    url: '/admin/user/sign/in',
    method: 'post',
    data
  });
}

export function getUser(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {token}
  });
}

export function addUser(data) {
  return request({
    url: '/admin/add/user',
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

export function getUserList() {
  return request({
    url: '/admin/user/list',
    method: 'get'
  });
}
