import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: `/job/tag/add/one`,
    method: 'post',
    data
  });
}

export function removeOne(jobTagId) {
  return request({
    url: `/job/tag/remove/one/${jobTagId}`,
    method: 'delete'
  });
}

export function updateOne(jobTagId, data) {
  return request({
    url: `/job/tag/update/one/${jobTagId}`,
    method: 'put',
    data
  });
}

export function updateMany(filter, data) {
  return request({
    url: `/job/tag/update/many`,
    method: 'put',
    params: filter,
    data
  });
}

export function getOne(jobTagId) {
  return request({
    url: `/job/tag/one/${jobTagId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: '/job/tag/list',
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: `/job/tag/total`,
    method: 'get',
    params: filter
  });
}

export function getPageList(args) {
  const {pageFlag, pageSize, ...params} = args;
  return request({
    url: `/job/tag/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}



