import request from '@/utils/request';

export function getNavList(params) {
  return request({
    // "" == params.lastId ? '/admin/nav/page/list/'+ params.pageFlag +'/'+ params.pageSize :
    url: '/admin/nav/page/list/'+ params.pageFlag + '/' + params.pageSize + '/' + params.lastId ,
    method: 'get'
  });
}

export function deleteOne(Id) {
  return request({
    url: '/admin/nav/remove/one/'+ Id,
    method: 'delete'
  });
}

export function getOneNav(Id) {
  return request({
    url: '/admin/nav/getOne/'+ Id,
    method: 'get'
  });
}

export function addNav(data) {
  return request({
    url: '/admin/nav/add/one',
    method: 'post',
    data
  });
}

export function edit(data) {
  return request({
    url: '/admin/nav/update/one',
    method: 'post',
    data
  });
}
