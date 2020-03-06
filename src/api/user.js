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

export function addOne(args) {
  return request({
    url: '/user/add/one',
    method: 'post',
    args
  });
}

export function removeOne(args) {
  return request({
    url: `/user/remove/one/${args}`,
    method: 'delete'
  });
}

export function updateOne(args) {
  return request({
    url: '/user/update/one',
    method: 'post',
    args
  });
}

export function getOne(args) {
  return request({
    url: `/user/one/${args}`,
    method: 'get'
  });
}

export function getList(args) {
  return request({
    url: '/user/list',
    method: 'get',
    params:args
  });
}

export function getTotal(args) {
  return request({
    url: `/user/total`,
    method: 'get',
    params: args
  });
}

export function getPageList(args) {
  return request({
    url: `/user/page/list/${args.pageFlag}/${args.pageSize}/${args.lastId}`,
    method: 'get',
    params: args.filter
  });
}
