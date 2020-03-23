import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/policy/save',
    method: 'post',
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/policy/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/policy/update/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/policy/list`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/policy/total`,
    method: 'get',
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/policy/one/${id}`,
    method: 'get'
  });
}
