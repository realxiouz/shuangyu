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

export function signOut() {
  return request({
    url: '/admin/user/sign/out',
    method: 'post'
  });
}

export function getUserList(pageFlag, pageSize, lastId,data) {
  return request({
    url: `/user/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function save(data) {
  return request({
    url: '/user/save/one',
    method: 'post',
    data
  });
}
export function updUser(data) {
  return request({
    url: '/user/update/one',
    method: 'post',
    data
  });
}
export function getUserTotal(data) {
  return request({
    url: `/user/total`,
    method: 'get',
    params: data
  });
}
