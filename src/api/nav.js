import request from '@/utils/request';

export function getPageList() {
  return request({
    url: '/nav/page/list' ,
    method: 'get'
  });
}

export function removeOne(params) {
  return request({
    url: `/nav/remove/one/${params}`,
    method: 'delete'
  });
}

export function getOne(params) {
  return request({
    url: `/nav/one/${params}`,
    method: 'get'
  });
}

export function addOne(data) {
  return request({
    url: `/nav/add/one`,
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/nav/update/one',
    method: 'post',
    data
  });
}

export function getList(data) {
  return request({
    url: '/nav/list',
    method: 'get',
    data
  });
}
