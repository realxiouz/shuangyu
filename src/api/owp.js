import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/owp/config/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/owp/config/update/one/${id}`,
    method: 'put',
    data
  });
}

export function getTotal(filter) {
  return request({
    url: `/owp/config/total`,
    method: 'get',
    params: filter
  });
}

export function getPageList(args) {
  const {pageFlag, pageSize, ...params} = args;
  return request({
    url: `/owp/config/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getOne(id) {
  return request({
    url: `/owp/config/get/one/${id}`,
    method: 'get'
  });
}

export function removeOne(id) {
  return request({
    url: `/owp/config/remove/one/${id}`,
    method: 'delete'
  });
}
