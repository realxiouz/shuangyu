import request from '@/utils/request';

export function getPageList(params) {
  return request({
    url: '/nav/page/list/'+ params.pageFlag + '/' + params.pageSize + '/' + params.lastId ,
    method: 'get'
  });
}

export function getNavList() {
  return request({
    url: '/nav/get/all' ,
    method: 'get'
  });
}

export function remove(Id) {
  return request({
    url: '/nav/remove/one/'+ Id,
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
  debugger;
  return request({
    url: '/nav/add/one',
    method: 'post',
    data
  });
}

export function update(data) {
  debugger;
  return request({
    url: '/admin/nav/update/one',
    method: 'post',
    data
  });
}
