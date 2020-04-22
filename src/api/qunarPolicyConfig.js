import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/qunar/policy/config/save',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: '/qunar/policy/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/qunar/policy/config/update/one',
    method: 'post',
    data
  });
}

export function removeOne(domain) {
  return request({
    url: `/qunar/policy/config/remove/one/${domain}`,
    method: 'delete'
  });
}

export function getOne(user) {
  return request({
    url: `/qunar/policy/config/one/${user}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/qunar/policy/config/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/qunar/policy/config/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/qunar/policy/config/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
