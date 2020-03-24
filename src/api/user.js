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
    url: '/user/sign/out',
    method: 'post'
  });
}

export function addOne(data) {
  return request({
    url: '/user/add/one',
    method: 'post',
    data
  });
}

export function removeOne(userId) {
  return request({
    url: `/user/remove/one/${userId}`,
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

export function getOne(userId) {
  return request({
    url: `/user/one/${userId}`,
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

// 更新激活标记
export function activate(data) {
  return request({
    url: `/admin/user/activate`,
    method: 'post',
    data
  });
}

export function resetPassword(userID) {
  return request({
    url: `/admin/user/reset/password/${userID}`,
    method: 'post'
  });
}

export function isExist(filed) {
  debugger
  return request({
    url: `/admin/user/exists/${filed}`,
    method: 'get'
  });
}
