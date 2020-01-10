import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  });
}

export function getInfo(token) {
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

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}

export function getUserList() {
  return request({
    url: '/admin/user/list',
    method: 'get'
  });
}
