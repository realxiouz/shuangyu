import request from '@/utils/request';

export function signIn(data) {
  return request({
    url: '/admin/user/sign/in',
    method: 'post',
    data
  });
}

// 验证码登录
export function signInCode(data) {
  return request({
    url: '/admin/user/sign/in/code',
    method: 'post',
    data
  });
}

// 获取用户验证码
export function getVerification(target) {
  return request({
    url: `/admin/user/get/verification/code/${target}`,
    method: 'get',
  });
}

export function signOut() {
  return request({
    url: '/admin/user/sign/out',
    method: 'post'
  });
}

export function addOne(data, vcode) {
  return request({
    url: `/admin/user/add/one/${vcode}`,
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

export function personalEdit(userId, verificationCode, data) {
  debugger
  return request({
    url: `/admin/user/update/one/${userId}/${verificationCode}`,
    method: 'put',
    data
  });
}

export function updateMany(filter, data, verificationCode) {
  return request({
    url: `/admin/user/update/many/${verificationCode}`,
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

export function getList(filter) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: `/admin/user/total`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/admin/user/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}

// 更新激活标记
export function activate(data) {
  return request({
    url: `/admin/user/activate`,
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
    url: `/admin/user/exists/${filed}`,
    method: 'get'
  });
}

export function getVerificationCode(targetEmail) {
  return request({
    url: `admin/user/get/verification/code/${targetEmail}`,
    method: 'get'
  });
}
