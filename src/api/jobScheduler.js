import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: `/job/scheduler/add/one`,
    method: 'post',
    data
  });
}
export function addOneXxl(data) {
  return request({
    url: `job/scheduler/xxl/add/one`,
    method: 'post',
    data
  });
}

export function removeOne(jobSchedulerId) {
  return request({
    url: `/job/scheduler/remove/one/${jobSchedulerId}`,
    method: 'delete'
  });
}

export function updateOne(jobSchedulerId, data) {
  return request({
    url: `/job/scheduler/update/one/${jobSchedulerId}`,
    method: 'put',
    data
  });
}

export function updateMany(filter, data) {
  return request({
    url: `/job/scheduler/update/many`,
    method: 'put',
    params: filter,
    data
  });
}

export function getOne(jobSchedulerId) {
  return request({
    url: `/job/scheduler/one/${jobSchedulerId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: '/job/scheduler/list',
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: `/job/scheduler/total`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/job/scheduler/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}



