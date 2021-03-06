import request from '@/utils/request';

export function save(data) {
  return request({
    url: `/eterm/config/save`,
    method: 'post',
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/eterm/config/remove/${id}`,
    method: 'get'
  });
}

export function online(id) {
  return request({
    url: `/eterm/config/online/${id}`,
    method: 'get'
  });
}

export function offline(id) {
  return request({
    url: `/eterm/config/offline/${id}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: '/eterm/config/list',
    method: 'get',
    params: filter
  });
}

