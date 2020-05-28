import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: `/job/config/add/one`,
    method: 'post',
    data
  });
}

export function removeOne(jobConfigId) {
  return request({
    url: `/job/config/remove/one/${jobConfigId}`,
    method: 'delete'
  });
}

export function updateOne(jobConfigId, data) {
  return request({
    url: `/job/config/update/one/${jobConfigId}`,
    method: 'put',
    data
  });
}

export function updateMany(filter, data) {
  return request({
    url: `/job/config/update/many`,
    method: 'put',
    params: filter,
    data
  });
}

export function getOne(jobConfigId) {
  return request({
    url: `/job/config/one/${jobConfigId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: '/job/config/list',
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: `/job/config/total`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/job/config/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}
