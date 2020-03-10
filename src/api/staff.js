import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/staff/add/one',
    method: 'post',
    data
  });
}

export function addMany(data) {
  return request({
    url: '/staff/add/many',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/staff/update/one',
    method: 'post',
    data
  });
}

export function removeOne(data) {
  return request({
    url: `/staff/remove/one`,
    method: 'post',
    data
  });
}

export function getOne(staffID) {
  return request({
    url: `/staff/one/${staffID}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/staff/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/staff/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/staff/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
