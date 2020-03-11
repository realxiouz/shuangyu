import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/policy/domain/save',
    method: 'post',
    data
  });
}

export function removeOne(user, domain) {
  return request({
    url: `/policy/domain/remove/one/${user}/${domain}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/policy/domain/update/one',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/policy/domain/list`,
    method: "get",
    params: params
  });
}

export function getOne(user, domain) {
  return request({
    url: `/policy/domain/one/${user}/${domain}`,
    method: 'get'
  });
}
