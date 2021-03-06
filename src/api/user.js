import request from '@/utils/request';
const qs = require('qs');

export function signIn(data) {
  return request({
    url: '/admin/user/sign/in',
    method: 'post',
    data
  });
}

export function signInCode(data) {
  return request({
    url: '/admin/user/sign/in/code',
    method: 'post',
    data
  });
}

export function signOut() {
  return request({
    url: '/admin/user/sign/out',
    method: 'post',
    data: {}
  });
}

export function addOne(data) {
  return request({
    url: `/admin/user/add/one`,
    method: 'post',
    data
  });
}

export function removeOne(userId) {
  return request({
    url: `/admin/user/remove/one/${userId}`,
    method: 'delete'
  });
}

export function updateOne(userId, data) {
  return request({
    url: `/admin/user/update/one/${userId}`,
    method: 'put',
    data
  });
}

export function saveOne(data) {
  return request({
    url: `/admin/user/save/one`,
    method: 'post',
    data
  });
}

export function updateMany(filter, data) {
  return request({
    url: `/admin/user/update/many`,
    method: 'put',
    params: filter,
    data
  });
}

export function getOne(userId) {
  return request({
    url: `/admin/user/one/${userId}`,
    method: 'get'
  });
}

export function getFirstOne(filter) {
  return request({
    url: '/admin/user/get/first/one',
    method: 'get',
    params: filter
  });
}

export function getList(filter) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/admin/user/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params,
    paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'comma'})
    }
  });
}

// 更新激活标记
export function activation(data) {
  return request({
    url: `/admin/user/activation`,
    method: 'put',
    data
  });
}

export function resetPassword(userID) {
  return request({
    url: `/admin/user/reset/password/${userID}`,
    method: 'put'
  });
}

export function isExist(filed) {
  return request({
    url: `/admin/user/exist/${filed}`,
    method: 'get'
  });
}

export function getVerifyCode(target) {
  return request({
    url: `admin/user/get/verify/code/${target}`,
    method: 'get'
  });
}
